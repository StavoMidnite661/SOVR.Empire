const { logger } = require("./logger")
const fs = require("fs").promises
const path = require("path")

// Audit log file path
const AUDIT_LOG_PATH = path.join(__dirname, "../logs/audit.log")

/**
 * Create an audit record for tracking and compliance
 *
 * @param {Object} record - Audit record data
 * @returns {Promise<void>}
 */
exports.createAuditRecord = async (record) => {
  try {
    // Add timestamp if not provided
    if (!record.timestamp) {
      record.timestamp = new Date()
    }

    // Format record as JSON string
    const logEntry =
      JSON.stringify({
        ...record,
        timestamp: record.timestamp.toISOString(),
      }) + "\n"

    // Append to audit log file
    await fs.appendFile(AUDIT_LOG_PATH, logEntry)

    // Also log to main logger at debug level
    logger.debug("Audit record created", { record })
  } catch (err) {
    logger.error(`Error creating audit record: ${err.message}`, { error: err.stack })
    // Don't throw error to prevent disrupting main flow
  }
}

/**
 * Get audit records for a specific event ID
 *
 * @param {string} eventId - Event ID to search for
 * @returns {Promise<Array>} - Array of matching audit records
 */
exports.getAuditRecords = async (eventId) => {
  try {
    // Read audit log file
    const data = await fs.readFile(AUDIT_LOG_PATH, "utf8")

    // Split into lines and parse each line as JSON
    const records = data
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => JSON.parse(line))
      .filter((record) => record.eventId === eventId)

    return records
  } catch (err) {
    logger.error(`Error getting audit records: ${err.message}`, { error: err.stack })
    return []
  }
}
