import bunyan from 'bunyan';
import bunyanFormat from 'bunyan-format';

// Global logging config

const levels = ['FATAL', 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'];

let level = process.env.LOG_LEVEL || 'DEBUG';

level = level.toUpperCase();

if (!levels.includes(level)) {
  level = 'INFO';
}

// default console config (stdout)
const streams = [{
  level,
  stream: bunyanFormat({ outputMode: 'short' })
}];

// create default logger instance
const Logger = bunyan.createLogger({
  name: process.env.APP_NAME || 'API',
  streams
});

export default Logger;
