const crypto = require("crypto");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const {
  validateName,
  validateEmail,
  validatePassword,
  validatePhone,
} = require("../utils/validation");
const emailService = require("./emailService");
const {
  CLIENT_URL,
  REFRESH_TOKEN_DURATION_DAYS_DEFAULT,
  REFRESH_TOKEN_DURATION_DAYS_REMEMBER_ME,
} = require("../config/env");

class AuthError extends Error {
  constructor(message, statusCode, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

const signup = async ({ fullName, email, password, phone }) => {
  const errors = [
    ...validateName(fullName),
    ...validateEmail(email),
    ...validatePassword(password),
  ];

  if (phone) {
    errors.push(...validatePhone(phone));
  }

  if (errors.length > 0) {
    throw new AuthError("Validation failed", 400, errors);
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new AuthError("Email already registered", 409);
  }

  const user = await User.create({
    fullName: fullName.trim(),
    email: normalizedEmail,
    password,
    phone: phone ? phone.trim() : undefined,
  });

  await emailService.sendWelcomeEmail({
    to: user.email,
    fullName: user.fullName,
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_DURATION_DAYS_DEFAULT * 24 * 60 * 60 * 1000),
    durationDays: REFRESH_TOKEN_DURATION_DAYS_DEFAULT,
  });

  return {
    user: user.toJSON(),
    accessToken,
    refreshToken,
  };
};

const login = async ({ email, password, rememberMe = false }) => {
  const errors = [];

  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");

  if (errors.length > 0) {
    throw new AuthError("Validation failed", 400, errors);
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail }).select(
    "+password"
  );
  if (!user) {
    console.log(`[AUTH] Failed Login - User: ${normalizedEmail} - Time: ${new Date().toISOString()} - Reason: Account not found`);
    throw new AuthError("Invalid email or password", 401);
  }

  if (user.lockUntil && user.lockUntil > new Date()) {
    console.log(`[AUTH] Locked Account - User: ${user.email} - Time: ${new Date().toISOString()} - Reason: Account locked`);
    throw new AuthError(
      "Your account has been temporarily locked due to multiple failed login attempts. Please try again in 15 minutes.",
      423
    );
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    user.loginAttempts = (user.loginAttempts || 0) + 1;

    let message = "Invalid email or password";
    let statusCode = 401;

    if (user.loginAttempts >= 5) {
      user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      user.loginAttempts = 0;
      message =
        "Your account has been temporarily locked due to multiple failed login attempts. Please try again in 15 minutes.";
      statusCode = 423;

      console.log(`[AUTH] Locked Account - User: ${user.email} - Time: ${new Date().toISOString()} - Reason: Account locked after 5 failed attempts`);
    }

    await user.save();

    console.log(`[AUTH] Failed Login - User: ${user.email} - Time: ${new Date().toISOString()} - Reason: Invalid password`);

    throw new AuthError(message, statusCode);
  }

  const wasLocked = user.lockUntil !== null;

  user.loginAttempts = 0;
  user.lockUntil = null;
  user.lastLogin = new Date();
  await user.save();

  if (wasLocked) {
    console.log(`[AUTH] Unlocked Account - User: ${user.email} - Time: ${new Date().toISOString()}`);
  }

  console.log(`[AUTH] Successful Login - User: ${user.email} - Time: ${new Date().toISOString()}`);

  const durationDays = rememberMe
    ? REFRESH_TOKEN_DURATION_DAYS_REMEMBER_ME
    : REFRESH_TOKEN_DURATION_DAYS_DEFAULT;

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000),
    durationDays,
  });

  return {
    user: user.toJSON(),
    accessToken,
    refreshToken,
  };
};

const refresh = async (refreshTokenValue) => {
  if (!refreshTokenValue) {
    throw new AuthError("Refresh token is required", 400);
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshTokenValue);
  } catch {
    throw new AuthError("Invalid or expired refresh token", 401);
  }

  const storedToken = await RefreshToken.findOne({ token: refreshTokenValue });
  if (!storedToken || storedToken.isRevoked) {
    await RefreshToken.updateMany(
      { user: decoded.userId, isRevoked: false },
      { isRevoked: true }
    );
    throw new AuthError("Invalid refresh token", 401);
  }

  const user = await User.findById(decoded.userId);
  if (!user || !user.isActive) {
    throw new AuthError("User not found or inactive", 401);
  }

  storedToken.isRevoked = true;
  await storedToken.save();

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  const durationDays = storedToken.durationDays || REFRESH_TOKEN_DURATION_DAYS_DEFAULT;

  await RefreshToken.create({
    user: user._id,
    token: newRefreshToken,
    expiresAt: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000),
    durationDays,
  });

  return {
    user: user.toJSON(),
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

const logout = async (refreshTokenValue) => {
  if (!refreshTokenValue) {
    throw new AuthError("Refresh token is required", 400);
  }

  const storedToken = await RefreshToken.findOne({ token: refreshTokenValue });
  if (storedToken && !storedToken.isRevoked) {
    storedToken.isRevoked = true;
    await storedToken.save();
  }

  return { message: "Logged out successfully" };
};

const forgotPassword = async (email) => {
  const errors = validateEmail(email);
  if (errors.length > 0) {
    throw new AuthError("Validation failed", 400, errors);
  }

  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    return {
      message:
        "If an account with that email exists, a password reset link has been sent.",
    };
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000);
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${CLIENT_URL}/reset-password/${rawToken}`;

  await emailService.sendPasswordResetEmail({
    to: user.email,
    resetUrl,
    fullName: user.fullName,
  });

  return {
    message:
      "If an account with that email exists, a password reset link has been sent.",
  };
};

const resetPassword = async (token, password) => {
  if (!token) {
    throw new AuthError("Reset token is required", 400);
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AuthError("Invalid or expired reset token", 400);
  }

  const errors = validatePassword(password);
  if (errors.length > 0) {
    throw new AuthError("Validation failed", 400, errors);
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  await RefreshToken.updateMany(
    { user: user._id, isRevoked: false },
    { isRevoked: true }
  );

  return { message: "Password has been reset successfully. Please log in again." };
};

const changePassword = async (userId, { currentPassword, newPassword, confirmPassword }) => {
  const errors = [];

  if (!currentPassword) errors.push("Current password is required");
  if (!newPassword) errors.push("New password is required");
  if (!confirmPassword) errors.push("Confirm password is required");

  if (errors.length > 0) {
    throw new AuthError("Validation failed", 400, errors);
  }

  if (newPassword !== confirmPassword) {
    throw new AuthError("New password and confirm password do not match", 400);
  }

  if (newPassword === currentPassword) {
    throw new AuthError("New password must be different from current password", 400);
  }

  const passwordValidationErrors = validatePassword(newPassword);
  if (passwordValidationErrors.length > 0) {
    throw new AuthError("Validation failed", 400, passwordValidationErrors);
  }

  const user = await User.findById(userId).select("+password");
  if (!user || !user.isActive) {
    throw new AuthError("User not found", 404);
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new AuthError("Current password is incorrect", 401);
  }

  user.password = newPassword;
  await user.save();

  await RefreshToken.updateMany(
    { user: user._id, isRevoked: false },
    { isRevoked: true }
  );

  return { message: "Password changed successfully. Please log in again." };
};

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user || !user.isActive) {
    throw new AuthError("User not found", 404);
  }
  return { user: user.toJSON() };
};

const updateProfile = async (userId, updates) => {
  const allowedFields = {};
  const errors = [];

  if (updates.fullName !== undefined) {
    const nameErrors = validateName(updates.fullName);
    if (nameErrors.length > 0) {
      errors.push(...nameErrors);
    } else {
      allowedFields.fullName = updates.fullName.trim();
    }
  }

  if (updates.phone !== undefined) {
    const phoneErrors = validatePhone(updates.phone);
    if (phoneErrors.length > 0) {
      errors.push(...phoneErrors);
    } else {
      allowedFields.phone = updates.phone.trim();
    }
  }

  if (updates.profileImage !== undefined) {
    allowedFields.profileImage = updates.profileImage;
  }

  if (errors.length > 0) {
    throw new AuthError("Validation failed", 400, errors);
  }

  const restrictedFields = ["email", "role", "password", "isVerified", "isActive"];
  for (const field of restrictedFields) {
    if (updates[field] !== undefined) {
      throw new AuthError(`Field '${field}' cannot be updated`, 400);
    }
  }

  const user = await User.findByIdAndUpdate(userId, allowedFields, {
    new: true,
    runValidators: true,
  });

  if (!user || !user.isActive) {
    throw new AuthError("User not found", 404);
  }

  return { user: user.toJSON() };
};

module.exports = {
  signup,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  getCurrentUser,
  updateProfile,
};
