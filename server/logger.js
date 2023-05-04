const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, prettyPrint } = format;
const CATEGORY = "node backend";

const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: [
    new transports.File({
      filename: "logs/backend.log",
    }),
  ],
});

module.exports = logger;
