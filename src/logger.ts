import Pino from "pino";

const level = process.env.LOG_LEVEL;
const redact = [
  "MYSQL_PASSWORD",
  "STRIPE_SECRETKEY",
  "JWT_SECRET",
  "headers.authorization",
  "user.passcode",
  "user.lastName",
  "user.phoneNumber",
  "user.email",
];

export const Logger = Pino({
  level,
  redact,
});
