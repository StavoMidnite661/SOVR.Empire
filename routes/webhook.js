const express = require("express")
const router = express.Router()
const webhookController = require("../controllers/webhookController")
const { validateWebhook } = require("../middleware/validateWebhook")

// Main webhook endpoint
router.post("/", validateWebhook, webhookController.handleIncomingWebhook)

// Specific endpoints for different webhook sources
router.post("/vault", validateWebhook, webhookController.handleVaultWebhook)
router.post("/cdp", validateWebhook, webhookController.handleCoinbaseWebhook)
router.post("/trust-check", validateWebhook, webhookController.handleTrustCheckWebhook)

// Webhook status endpoint
router.get("/status", webhookController.getWebhookStatus)

module.exports = router
