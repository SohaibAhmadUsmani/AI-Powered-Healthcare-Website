const { Router } = require("express");
const passport = require("../config/passport");
const {
  googleCallback,
  facebookCallback,
} = require("../controllers/oauth.controller");

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `/auth/login?error=google_authentication_failed`,
  }),
  googleCallback
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
    session: false,
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: `/auth/login?error=facebook_authentication_failed`,
  }),
  facebookCallback
);

module.exports = router;
