const { verifySignature } = require("../utils/verifySignature")
const { processPayout } = require("../utils/payoutEngine")
const { processVaultAction } = require("../utils/vaultEngine")
const { logger } = require("../utils/logger")
const { cdpClient } = require("../services/cdpClient")
const { createAuditRecord } = require("../utils/auditTrail")

/**
 * Main webhook handler - routes to specific handlers based on event type
 */
exports.handleIncomingWebhook = async (req, res) => {
  try {
    const event = req.body
    const eventId = event.id || `evt_${Date.now()}`

    logger.info(`📨 Event Received [${eventId}]: ${event.type}`, {
      eventType: event.type,
      source: req.headers["x-webhook-source"] || "unknown",
    })

    // Create audit trail entry
    await createAuditRecord({
      eventId,
      eventType: event.type,
      source: req.headers["x-webhook-source"] || "unknown",
      timestamp: new Date(),
      ipAddress: req.ip,
      status: "received",
    })

    // Route to appropriate handler based on event type
    if (event.type.startsWith("vault.")) {
      await this.handleVaultWebhook(req, res)
    } else if (event.type.startsWith("cdp.")) {
      await this.handleCoinbaseWebhook(req, res)
    } else if (event.type.startsWith("trust.")) {
      await this.handleTrustCheckWebhook(req, res)
    } else {
      // Process generic event
      await processPayout(event)

      logger.info(`✅ Event processed [${eventId}]`)
      return res.status(200).json({
        status: "success",
        message: "Event processed successfully",
        eventId,
      })
    }
  } catch (err) {
    logger.error(`❌ Webhook error: ${err.message}`, { error: err.stack })
    return res.status(500).json({
      status: "error",
      message: "Error processing webhook",
      error: err.message,
    })
  }
}

/**
 * Handle vault-specific webhook events
 */
exports.handleVaultWebhook = async (req, res) => {
  try {
    const event = req.body
    const eventId = event.id || `evt_${Date.now()}`

    logger.info(`🏦 Vault Event [${eventId}]: ${event.type}`)

    // Process vault-specific logic
    if (event.type === "vault.deposit.confirmed") {
      // Handle deposit confirmation
      await processVaultAction(event)

      // Trigger payout if needed
      await processPayout({
        type: "payout.request",
        data: {
          amount: event.data.amount,
          currency: event.data.currency,
          walletAddress: event.data.walletAddress,
          method: event.data.payoutMethod || "default",
          reference: `vault_deposit_${eventId}`,
        },
      })

      logger.info(`💸 Payout triggered for vault deposit [${eventId}]`)
    } else if (event.type === "vault.withdrawal.requested") {
      // Handle withdrawal request
      await processVaultAction(event)
      logger.info(`🔄 Vault withdrawal processed [${eventId}]`)
    }

    // Update audit trail
    await createAuditRecord({
      eventId,
      eventType: event.type,
      source: "vault",
      timestamp: new Date(),
      status: "processed",
      result: "success",
    })

    return res.status(200).json({
      status: "success",
      message: "Vault event processed successfully",
      eventId,
    })
  } catch (err) {
    logger.error(`❌ Vault webhook error: ${err.message}`, { error: err.stack })
    return res.status(500).json({
      status: "error",
      message: "Error processing vault webhook",
      error: err.message,
    })
  }
}

/**
 * Handle Coinbase CDP webhook events
 */
exports.handleCoinbaseWebhook = async (req, res) => {
  try {
    const event = req.body
    const eventId = event.id || `evt_${Date.now()}`

    logger.info(`🪙 CDP Event [${eventId}]: ${event.type}`)

    // Verify CDP signature (additional verification)
    const signature = req.headers["x-cdp-signature"]
    if (!verifySignature(req.rawBody, signature, process.env.CDP_WEBHOOK_SECRET)) {
      logger.warn(`🚫 Invalid CDP signature [${eventId}]`)
      return res.status(401).json({
        status: "error",
        message: "Invalid signature",
      })
    }

    // Process CDP-specific logic
    if (event.type === "cdp.transaction.confirmed") {
      // Handle CDP transaction confirmation
      await processPayout({
        type: "payout.request",
        data: {
          amount: event.data.amount,
          currency: event.data.currency,
          destination: event.data.destination,
          method: event.data.payoutMethod || "coinbase",
          reference: `cdp_tx_${eventId}`,
        },
      })

      logger.info(`💸 CDP payout triggered [${eventId}]`)
    }

    // Update audit trail
    await createAuditRecord({
      eventId,
      eventType: event.type,
      source: "cdp",
      timestamp: new Date(),
      status: "processed",
      result: "success",
    })

    return res.status(200).json({
      status: "success",
      message: "CDP event processed successfully",
      eventId,
    })
  } catch (err) {
    logger.error(`❌ CDP webhook error: ${err.message}`, { error: err.stack })
    return res.status(500).json({
      status: "error",
      message: "Error processing CDP webhook",
      error: err.message,
    })
  }
}

/**
 * Handle Trust Check webhook events
 */
exports.handleTrustCheckWebhook = async (req, res) => {
  try {
    const event = req.body
    const eventId = event.id || `evt_${Date.now()}`

    logger.info(`🧾 Trust Check Event [${eventId}]: ${event.type}`)

    // Process trust check-specific logic
    if (event.type === "trust.check.presented") {
      // Validate trust check data
      const { sender, recipient, amount, checkId, signature } = event.data

      // TODO: Add trust check validation logic here

      // Process payout for trust check
      await processPayout({
        type: "payout.request",
        data: {
          amount,
          sender,
          recipient,
          checkId,
          method: event.data.payoutMethod || "zelle",
          reference: `trust_check_${checkId}`,
        },
      })

      logger.info(`💸 Trust check payout triggered [${eventId}]`)
    }

    // Update audit trail
    await createAuditRecord({
      eventId,
      eventType: event.type,
      source: "trust_check",
      timestamp: new Date(),
      status: "processed",
      result: "success",
    })

    return res.status(200).json({
      status: "success",
      message: "Trust check event processed successfully",
      eventId,
    })
  } catch (err) {
    logger.error(`❌ Trust check webhook error: ${err.message}`, { error: err.stack })
    return res.status(500).json({
      status: "error",
      message: "Error processing trust check webhook",
      error: err.message,
    })
  }
}

/**
 * Get webhook status
 */
exports.getWebhookStatus = async (req, res) => {
  try {
    // Check CDP client status
    const cdpStatus = await cdpClient.getStatus()

    return res.status(200).json({
      status: "active",
      timestamp: new Date().toISOString(),
      services: {
        cdp: cdpStatus,
        vault: "connected",
        payout: "ready",
      },
      version: "1.0.0",
    })
  } catch (err) {
    logger.error(`Error getting webhook status: ${err.message}`)
    return res.status(500).json({
      status: "error",
      message: "Error getting webhook status",
    })
  }
}
