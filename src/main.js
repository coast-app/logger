import bunyan from 'bunyan';
import bunyanFormat from 'bunyan-format';

// Global logging config

const levels = ['FATAL', 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'];

let level = process.env.LOG_LEVEL || 'DEBUG';

level = level.toUpperCase();

if (!levels.includes(level)) {
  level = 'INFO';
}

// allow overriding the stdout log formatting
// available options: short|long|simple|json|bunyan
// https://www.npmjs.com/package/bunyan-format
const outputMode = process.env.LOG_FORMAT || 'short';

// default console config (stdout)
const streams = [{
  level,
  stream: bunyanFormat({ outputMode })
}];

// serializer to pull useful fields from the req object
function reqSerializer(req) {
  if (!req || !req.connection) {
    return req;
  }

  const { method, url, headers, connection: { remoteAddress, remotePort } } = req;

  return {
    method,
    url,
    headers,
    remoteAddress,
    remotePort
  };
}

// serializer to pull useful fields from the res object
function resSerializer(res) {
  if (!res || !res.statusCode) {
    return res;
  }
  return {
    statusCode: res.statusCode,
    header: res._header
  };
}

// create default logger instance
const Logger = bunyan.createLogger({
  name: process.env.APP_NAME || 'API',
  streams,
  serializers: {
    req: reqSerializer,
    res: resSerializer,
    error: bunyan.stdSerializers.err,
    err: bunyan.stdSerializers.err
  }
});

export default Logger;
