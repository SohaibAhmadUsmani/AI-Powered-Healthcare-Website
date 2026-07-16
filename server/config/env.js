const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "your_access_secret_change_this";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your_refresh_secret_change_this";
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";
const REFRESH_TOKEN_DURATION_DAYS_DEFAULT = 7;
const REFRESH_TOKEN_DURATION_DAYS_REMEMBER_ME = 30;

module.exports = {
  PORT,
  CLIENT_URL,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  REFRESH_TOKEN_DURATION_DAYS_DEFAULT,
  REFRESH_TOKEN_DURATION_DAYS_REMEMBER_ME,
};
