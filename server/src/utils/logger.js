import winston from 'winston';

const { timestamp, printf, json, colorize, combine, errors, splat, label } = winston.format;

const myFormat = printf(({ level, message, label, timestamp, stack }) => {
  return `${timestamp} [${label || 'service'}] ${level}: ${stack || message}`;
});

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: combine(
    label({ label: 'all' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    splat(),
    errors({ stack: true }),
    json()
  ),
  defaultMeta: { service: 'all' },
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        label({ label: 'all' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        splat(),
        errors({ stack: true }),
        myFormat
      )
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'info.log' }),
  ]
});
