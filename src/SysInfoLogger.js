const { appendFile } = require('fs');
const os = require('os');

const logFile = "./logs/systemInfo.log";

function systemInfoLogger() {
    const info = {
        platform: process.platform,
        cpuCores: require('os').cpus().length,
        totalMemory: require('os').totalmem(),
    }
    const log = 'System Information:\n' +
        `Platform: ${info.platform}\n` +
        `CPU Cores: ${info.cpuCores}\n` +
        `Total Memory: ${info.totalMemory / (1024 * 1024 * 1024)} GB\n\n` ;

    appendFile(logFile, log, (err) => {
        if (err) {
            console.error('Error writing to log file', err);
        } else {
            console.log('System information logged successfully.');
        }
    });
}

module.exports = systemInfoLogger;