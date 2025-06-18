const { verifySignature } = require("../utils/verifySignature")
const { logger } = require("../utils/logger")

/**
 * Middleware to validate incoming webhooks
 */
exports.validateWebhook = (req, res, next) => {
  try {
    // Check content type
    if (req.headers["content-type"] !== "application/json") {
      logger.warn("Invalid content type", { contentType: req.headers["content-type"] })
      return res.status(400).json({
        status: "error",
        message: "Invalid content type. Expected application/json",
      })
    }

    // Check for required fields
    if (!req.body || !req.body.type) {
      logger.warn("Missing required fields in webhook payload")
      return res.status(400).json({
        status: "error",
        message: "Missing required fields in webhook payload",
      })
    }

    // Determine signature verification method based on source
    const source = req.path.replace("/", "") || req.headers["x-webhook-source"] || "unknown"

    // Get appropriate signature header and secret
    let signature, secret

    switch (source) {
      case "cdp":
        signature = req.headers["x-cdp-signature"]
        secret = process.env.CDP_WEBHOOK_SECRET
        break
      case "vault":
        signature = req.headers["x-vault-signature"]
        secret = process.env.VAULT_WEBHOOK_SECRET
        break
      case "trust-check":
        signature = req.headers["x-trust-signature"]
        secret = process.env.TRUST_WEBHOOK_SECRET
        break
      default:
        // For generic endpoint, try to determine from event type
        if (req.body.type.startsWith("cdp.")) {
          signature = req.headers["x-cdp-signature"]
          secret = process.env.CDP_WEBHOOK_SECRET
        } else if (req.body.type.startsWith("vault.")) {
          signature = req.headers["x-vault-signature"]
          secret = process.env.VAULT_WEBHOOK_SECRET
        } else if (req.body.type.startsWith("trust.")) {
          signature = req.headers["x-trust-signature"]
          secret = process.env.TRUST_WEBHOOK_SECRET
        } else {
          // Default to CDP for unknown sources
          signature = req.headers["x-cdp-signature"]
          secret = process.env.CDP_WEBHOOK_SECRET
        }
    }

    // Skip signature verification in development if flag is set
    if (process.env.NODE_ENV === "development" && process.env.SKIP_SIGNATURE_VERIFICATION === "true") {
      logger.warn("⚠️ Skipping signature verification in development mode")
      return next()
    }

    // Verify signature if available
    if (signature && secret) {
      if (!verifySignature(req.rawBody, signature, secret)) {
        logger.warn("Invalid signature", { source })
        return res.status(401).json({
          status: "error",
          message: "Invalid signature",
        })
      }
    } else {
      logger.warn("Missing signature or secret", { source })
      return res.status(401).json({
        status: "error",
        message: "Missing signature or secret",
      })
    }

    // If all validations pass, proceed
    next()
  } catch (err) {
    logger.error(`Webhook validation error: ${err.message}`, { error: err.stack })
    return res.status(500).json({
      status: "error",
      message: "Error validating webhook",
    })
  }
}
