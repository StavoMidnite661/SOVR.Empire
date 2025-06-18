const crypto = require("crypto")

/**
 * Verify webhook signature using HMAC-SHA256
 *
 * @param {string} payload - Raw request body
 * @param {string} signatureHeader - Signature from request header
 * @param {string} secret - Secret key for verification
 * @returns {boolean} - Whether signature is valid
 */
exports.verifySignature = (payload, signatureHeader, secret) => {
  if (!payload || !signatureHeader || !secret) {
    return false
  }

  try {
    // Generate expected signature
    const expectedSignature = crypto.createHmac("sha256", secret).update(payload).digest("hex")

    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signatureHeader))
  } catch (err) {
    console.error("Signature verification error:", err)
    return false
  }
}
