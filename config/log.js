const fs = require('fs').promises;

async function logInfo(logLevel,message) {
    try {
        // Log to the console
        console.log(`${new Date().toISOString()} - [${logLevel}] ${message}`);
        // Log to a file
        // const logMessage = `${new Date().toISOString()} - [${logLevel}] ${message}\n`;
        // await fs.appendFile('example.log', logMessage);
    } catch (err) {
        console.error('Error appending to log file:', err);
    }
}

module.exports = logInfo;
