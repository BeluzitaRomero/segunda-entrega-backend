//--WINSTON
const { createLogger, format, transports } = require("winston");
//trasport es lo que hace apendices y categorias

const logger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
    }),
    new transports.File({
      filename: "warn.log",
      level: "warn",
    }),
    new transports.File({
      filename: "error.log",
      level: "error",
    }),
  ],
});

module.exports = logger;
