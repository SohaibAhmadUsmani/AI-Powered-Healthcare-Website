const oauthService = require("../services/oauthService");

const googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(
        `${process.env.CLIENT_URL || "http://localhost:5173"}/auth/login?error=authentication_failed`
      );
    }

    const result = await oauthService.oauthLogin(req.user);
    const redirectUrl = new URL(
      process.env.CLIENT_URL || "http://localhost:5173"
    );
    redirectUrl.pathname = "/auth/oauth/callback";
    redirectUrl.searchParams.set("accessToken", result.accessToken);
    redirectUrl.searchParams.set("refreshToken", result.refreshToken);

    return res.redirect(redirectUrl.toString());
  } catch (error) {
    const redirectUrl = new URL(
      process.env.CLIENT_URL || "http://localhost:5173"
    );
    redirectUrl.pathname = "/auth/login";
    redirectUrl.searchParams.set(
      "error",
      error.message || "OAuth authentication failed"
    );
    return res.redirect(redirectUrl.toString());
  }
};

const facebookCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(
        `${process.env.CLIENT_URL || "http://localhost:5173"}/auth/login?error=authentication_failed`
      );
    }

    const result = await oauthService.oauthLogin(req.user);
    const redirectUrl = new URL(
      process.env.CLIENT_URL || "http://localhost:5173"
    );
    redirectUrl.pathname = "/auth/oauth/callback";
    redirectUrl.searchParams.set("accessToken", result.accessToken);
    redirectUrl.searchParams.set("refreshToken", result.refreshToken);

    return res.redirect(redirectUrl.toString());
  } catch (error) {
    const redirectUrl = new URL(
      process.env.CLIENT_URL || "http://localhost:5173"
    );
    redirectUrl.pathname = "/auth/login";
    redirectUrl.searchParams.set(
      "error",
      error.message || "OAuth authentication failed"
    );
    return res.redirect(redirectUrl.toString());
  }
};

module.exports = { googleCallback, facebookCallback };
