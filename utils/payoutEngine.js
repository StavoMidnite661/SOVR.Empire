const { logger } = require("./logger")
const { createAuditRecord } = require("./auditTrail")
const { ZelleService } = require("../services/zelleService")
const { CashAppService } = require("../services/cashAppService")
const { VenmoService } = require("../services/venmoService")
const { CoinbaseService } = require("../services/coinbaseService")
const { OnChainService } = require("../services/onChainService")

// Initialize payout services
const zelleService = new ZelleService()
const cashAppService = new CashAppService()
const venmoService = new VenmoService()
const coinbaseService = new CoinbaseService()
const onChainService = new OnChainService()

/**
 * Process payout based on event data
 *
 * @param {Object} event - Event data
 * @returns {Promise<Object>} - Payout result
 */
exports.processPayout = async (event) => {
  try {
    const { type, data } = event
    const payoutId = `payout_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`

    logger.info(`🚀 Processing payout [${payoutId}]`, {
      payoutId,
      type,
      amount: data.amount,
      currency: data.currency,
      method: data.method,
    })

    // Create audit record for payout initiation
    await createAuditRecord({
      eventId: payoutId,
      eventType: "payout.initiated",
      source: type,
      timestamp: new Date(),
      status: "processing",
      data: {
        amount: data.amount,
        currency: data.currency,
        method: data.method,
        reference: data.reference,
      },
    })

    // Select payout service based on method
    let payoutResult

    switch (data.method?.toLowerCase()) {
      case "zelle":
        payoutResult = await zelleService.sendPayment({
          amount: data.amount,
          recipient: data.recipient,
          reference: data.reference,
          memo: `SOVR Trust Payment - ${data.reference}`,
        })
        break

      case "cashapp":
        payoutResult = await cashAppService.sendPayment({
          amount: data.amount,
          recipient: data.recipient,
          reference: data.reference,
          memo: `SOVR Trust Payment - ${data.reference}`,
        })
        break

      case "venmo":
        payoutResult = await venmoService.sendPayment({
          amount: data.amount,
          recipient: data.recipient,
          reference: data.reference,
          memo: `SOVR Trust Payment - ${data.reference}`,
        })
        break

      case "coinbase":
        payoutResult = await coinbaseService.sendPayment({
          amount: data.amount,
          currency: data.currency || "USD",
          destination: data.destination,
          reference: data.reference,
        })
        break

      case "onchain":
        payoutResult = await onChainService.sendTransaction({
          amount: data.amount,
          token: data.token || "ECHO",
          recipient: data.walletAddress,
          reference: data.reference,
        })
        break

      default:
        // Default to Coinbase for unknown methods
        payoutResult = await coinbaseService.sendPayment({
          amount: data.amount,
          currency: data.currency || "USD",
          destination: data.destination || data.recipient,
          reference: data.reference,
        })
    }

    // Update audit record with payout result
    await createAuditRecord({
      eventId: payoutId,
      eventType: "payout.completed",
      source: data.method,
      timestamp: new Date(),
      status: "completed",
      data: {
        amount: data.amount,
        currency: data.currency,
        method: data.method,
        reference: data.reference,
        result: payoutResult,
      },
    })

    logger.info(`✅ Payout completed [${payoutId}]`, {
      payoutId,
      result: payoutResult,
    })

    return payoutResult
  } catch (err) {
    logger.error(`❌ Payout error: ${err.message}`, { error: err.stack })
    throw err
  }
}
