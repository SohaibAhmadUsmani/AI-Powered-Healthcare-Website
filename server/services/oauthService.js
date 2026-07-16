const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt");

class OAuthError extends Error {
  constructor(message, statusCode, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

const findUserByProvider = async (provider, providerId) => {
  let user = await User.findOne({ provider, providerId });
  if (user) return user;
  user = await User.findOne({
    linkedProviders: { $elemMatch: { provider, providerId } },
  });
  return user;
};

const linkProviderToUser = async (user, provider, providerId, profile) => {
  const alreadyLinked = user.linkedProviders.some(
    (lp) => lp.provider === provider && lp.providerId === providerId
  );

  if (!alreadyLinked) {
    user.linkedProviders.push({ provider, providerId });
  }

  if (!user.providerId) {
    user.provider = provider;
    user.providerId = providerId;
  }

  if (!user.isVerified) {
    user.isVerified = true;
  }

  if (!user.profileImage && profile.photos && profile.photos.length > 0) {
    user.profileImage = profile.photos[0].value;
  }

  await user.save();
  return user;
};

const extractProfileData = (profile) => {
  const email =
    profile.emails && profile.emails.length > 0
      ? profile.emails[0].value
      : null;

  const displayName =
    profile.displayName ||
    (profile.name
      ? `${profile.name.givenName || ""} ${profile.name.familyName || ""}`.trim()
      : null) ||
    (email ? email.split("@")[0] : "User");

  const photo =
    profile.photos && profile.photos.length > 0
      ? profile.photos[0].value
      : "";

  return { email, displayName, photo };
};

const findOrCreateOAuthUser = async (profile, provider) => {
  const { email, displayName, photo } = extractProfileData(profile);

  if (!email) {
    throw new OAuthError(
      `${provider} account must have an email address.`,
      400
    );
  }

  const providerId = profile.id;

  const existingByProvider = await findUserByProvider(provider, providerId);

  if (existingByProvider) {
    return existingByProvider;
  }

  const existingByEmail = await User.findOne({ email });

  if (existingByEmail) {
    return linkProviderToUser(
      existingByEmail,
      provider,
      providerId,
      profile
    );
  }

  const newUser = await User.create({
    fullName: displayName,
    email,
    provider,
    providerId,
    profileImage: photo,
    isVerified: true,
    isActive: true,
    lastLogin: new Date(),
  });

  return newUser;
};

const oauthLogin = async (user) => {
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    user: user.toJSON(),
    accessToken,
    refreshToken,
  };
};

module.exports = {
  findOrCreateOAuthUser,
  oauthLogin,
  OAuthError,
};
