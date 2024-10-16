import pino from "pino";

export const LOG_LEVEL = "debug";
export const transport = { target: "pino-pretty", options: { colorize: true } };

const logger = pino({
  transport,
  level: LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
});

export default logger;
