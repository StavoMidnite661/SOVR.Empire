const { logger } = require("../utils/logger")
const axios = require("axios")

/**
 * Coinbase Digital Payments (CDP) client
 */
class CDPClient {
  constructor() {
    this.apiKey = process.env.CDP_API_KEY
    this.apiSecret = process.env.CDP_API_SECRET
    this.baseUrl = process.env.CDP_API_URL || "https://api.commerce.coinbase.com"
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "X-CC-Api-Key": this.apiKey,
        "X-CC-Version": "2018-03-22",
        "Content-Type": "application/json",
      },
    })

    logger.info("CDP client initialized")
  }

  /**
   * Get CDP client status
   */
  async getStatus() {
    try {
      const response = await this.client.get("/checkouts")
      return {
        status: "connected",
        timestamp: new Date().toISOString(),
      }
    } catch (err) {
      logger.error(`CDP status check error: ${err.message}`)
      return {
        status: "error",
        message: err.message,
        timestamp: new Date().toISOString(),
      }
    }
  }

  /**
   * Create a new charge
   */
  async createCharge(params) {
    try {
      const response = await this.client.post("/charges", params)
      logger.info(`CDP charge created: ${response.data.data.code}`)
      return response.data.data
    } catch (err) {
      logger.error(`CDP create charge error: ${err.message}`)
      throw err
    }
  }

  /**
   * Get charge details
   */
  async getCharge(chargeId) {
    try {
      const response = await this.client.get(`/charges/${chargeId}`)
      return response.data.data
    } catch (err) {
      logger.error(`CDP get charge error: ${err.message}`)
      throw err
    }
  }

  /**
   * Create a payout
   */
  async createPayout(params) {
    try {
      // Note: This is a placeholder as the actual CDP API might differ
      const response = await this.client.post("/payouts", params)
      logger.info(`CDP payout created: ${response.data.data.id}`)
      return response.data.data
    } catch (err) {
      logger.error(`CDP create payout error: ${err.message}`)
      throw err
    }
  }
}

// Export singleton instance
exports.cdpClient = new CDPClient()
