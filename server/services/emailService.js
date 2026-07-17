const { CLIENT_URL } = require("../config/env");

const sendPasswordResetEmail = async ({ to, resetUrl, fullName }) => {
  console.log(`[EMAIL] Password reset requested for ${to}`);
  console.log(`[EMAIL] Reset URL: ${resetUrl}`);
  console.log(`[EMAIL] In production, an email would be sent to ${fullName} <${to}>`);

  return { success: true };
};

const sendWelcomeEmail = async ({ to, fullName }) => {
  console.log(`[EMAIL] Welcome email for ${fullName} <${to}>`);
  console.log(`[EMAIL] In production, a welcome email would be sent.`);

  return { success: true };
};

const sendVerificationEmail = async ({ to, verificationUrl, fullName }) => {
  console.log(`[EMAIL] Email verification requested for ${fullName} <${to}>`);
  console.log(`[EMAIL] Verification URL: ${verificationUrl}`);
  console.log(`[EMAIL] In production, a verification email would be sent.`);

  return { success: true };
};

module.exports = { sendPasswordResetEmail, sendWelcomeEmail, sendVerificationEmail };
