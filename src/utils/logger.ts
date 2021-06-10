import { createLogger, format, Logger, LoggerOptions, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const options: LoggerOptions = {
    exitOnError: false,
    format: format.combine(format.timestamp(), format.prettyPrint()),
    transports: [
        new DailyRotateFile({
            datePattern: "YYYY-MM-DD",
            filename: "logs/errors/%DATE%.log",
            level: "error",
            maxFiles: "14d",
            maxSize: "20m",
            zippedArchive: true,
        }),
        new DailyRotateFile({
            datePattern: "YYYY-MM-DD",
            filename: "logs/info/%DATE%.log",
            level: "info",
            maxFiles: "14d",
            maxSize: "20m",
            zippedArchive: true,
        }),
    ],

    exceptionHandlers: [
        new DailyRotateFile({
            datePattern: "YYYY-MM-DD",
            filename: "logs/exceptions/%DATE%.log",
            maxFiles: "14d",
            maxSize: "20m",
            zippedArchive: true,
        }),
        new transports.Console(),
    ],
};

const logger: Logger = createLogger(options);

if (process.env.DEV) {
    logger.add(
        new transports.Console({
            level: "debug",
        })
    );
}

export { logger };
