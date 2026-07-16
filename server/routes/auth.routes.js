const { Router } = require("express");
const {
  signup,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  getMe,
  updateProfile,
} = require("../controllers/auth.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const loginLimiter = require("../middleware/loginLimiter");

const router = Router();

router.post("/signup", signup);
router.post("/login", loginLimiter, login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.put("/change-password", authenticate, changePassword);
router.get("/me", authenticate, getMe);
router.put("/profile", authenticate, updateProfile);

module.exports = router;
