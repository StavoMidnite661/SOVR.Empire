require('dotenv').config()

const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const webhookRoutes = require("./routes/webhook")
const { logger } = require("./utils/logger")

// Initialize Express app
const app = express()

// Security middleware
app.use(helmet())
app.use(cors())

// Parse raw body for signature verification
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString()
    },
  }),
)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
})
app.use("/webhook", limiter)

// Routes
app.use("/webhook", webhookRoutes)

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`, { error: err.stack })
  res.status(500).json({ error: "Internal server error" })
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  logger.info(`✅ SOVR Webhook server running on port ${PORT}`)
  logger.info(`🔐 Environment: ${process.env.NODE_ENV || "development"}`)
})

module.exports = app
