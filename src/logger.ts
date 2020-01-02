import bunyan, { INFO, LogLevel, resolveLevel, Stream } from 'bunyan';
import bunyanFormat from 'bunyan-format';

let level: number;
try {
  const levelString = (process.env.LOG_LEVEL || 'debug') as LogLevel;
  level = resolveLevel(levelString);
} catch (error) {
  level = INFO;
}

// allow overriding the stdout log formatting
// available options: short|long|simple|json|bunyan
// https://www.npmjs.com/package/bunyan-format
type OutputModeType = 'short' | 'long' | 'simple' | 'json' | 'bunyan';
let outputMode: OutputModeType;
if (['short', 'long', 'simple', 'json', 'bunyan'].includes(process.env.LOG_FORMAT)) {
  outputMode = process.env.LOG_FORMAT as OutputModeType;
} else {
  outputMode = 'short';
}
// default console config (stdout)
const streams: Stream[] = [{
  level,
  stream: bunyanFormat({ outputMode }),
}];

// serializer to pull useful fields from the req object
function reqSerializer(req: any) {
  if (!req || !req.connection) {
    return req;
  }

  const { method, url, headers, connection: { remoteAddress, remotePort } } = req;

  return {
    headers,
    method,
    remoteAddress,
    remotePort,
    url,
  };
}

// serializer to pull useful fields from the res object
function resSerializer(res: any) {
  if (!res || !res.statusCode) {
    return res;
  }
  return {
    header: res._header,
    statusCode: res.statusCode,
  };
}

// create default logger instance
export const Logger = bunyan.createLogger({
  name: process.env.APP_NAME || 'API',
  serializers: {
    err: bunyan.stdSerializers.err,
    error: bunyan.stdSerializers.err,
    req: reqSerializer,
    res: resSerializer,
  },
  streams,
});
