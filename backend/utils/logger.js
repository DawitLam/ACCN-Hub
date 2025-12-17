const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log levels
const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

// Format log message
const formatMessage = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  const metaStr = Object.keys(meta).length ? ` | ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level}] ${message}${metaStr}\n`;
};

// Write to log file
const writeLog = (level, message, meta) => {
  if (process.env.NODE_ENV === 'production') {
    const logFile = path.join(logsDir, `${new Date().toISOString().split('T')[0]}.log`);
    const logMessage = formatMessage(level, message, meta);
    fs.appendFileSync(logFile, logMessage);
  }
};

// Logger object
const logger = {
  error: (message, meta = {}) => {
    console.error(`[ERROR] ${message}`, meta);
    writeLog(LOG_LEVELS.ERROR, message, meta);
  },
  
  warn: (message, meta = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[WARN] ${message}`, meta);
    }
    writeLog(LOG_LEVELS.WARN, message, meta);
  },
  
  info: (message, meta = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${message}`, meta);
    }
    writeLog(LOG_LEVELS.INFO, message, meta);
  },
  
  debug: (message, meta = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${message}`, meta);
    }
  }
};

module.exports = logger;
