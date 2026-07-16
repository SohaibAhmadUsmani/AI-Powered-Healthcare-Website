const authService = require("../services/authService");

const signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    return res.status(201).json({
      success: true,
      message: "Signup successful",
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
      errors: error.errors || [],
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login({
      email: req.body.email,
      password: req.body.password,
      rememberMe: req.body.rememberMe,
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
      errors: error.errors || [],
    });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refresh(refreshToken);
    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
      errors: error.errors || [],
    });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.logout(refreshToken);
    return res.status(200).json({
      success: true,
      message: result.message,
      data: {},
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
      errors: error.errors || [],
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    return res.status(200).json({
      success: true,
      message: result.message,
      data: {},
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
      errors: error.errors || [],
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const result = await authService.resetPassword(token, password);
    return res.status(200).json({
      success: true,
      message: result.message,
      data: {},
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
      errors: error.errors || [],
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const result = await authService.changePassword(req.user._id, req.body);
    return res.status(200).json({
      success: true,
      message: result.message,
      data: {},
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
      errors: error.errors || [],
    });
  }
};

const getMe = async (req, res) => {
  try {
    const result = await authService.getCurrentUser(req.user._id);
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
      errors: error.errors || [],
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const result = await authService.updateProfile(req.user._id, req.body);
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
      errors: error.errors || [],
    });
  }
};

module.exports = {
  signup,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  getMe,
  updateProfile,
};
