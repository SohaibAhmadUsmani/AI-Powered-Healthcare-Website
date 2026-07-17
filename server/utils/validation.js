const validateName = (name) => {
  const errors = [];
  if (!name || typeof name !== "string") {
    errors.push("Full name is required");
    return errors;
  }
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    errors.push("Full name must be at least 2 characters");
  }
  if (trimmed.length > 50) {
    errors.push("Full name must not exceed 50 characters");
  }
  return errors;
};

const validateEmail = (email) => {
  const errors = [];
  if (!email || typeof email !== "string") {
    errors.push("Email is required");
    return errors;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    errors.push("Please provide a valid email address");
  }
  return errors;
};

const validatePassword = (password) => {
  const errors = [];
  if (!password || typeof password !== "string") {
    errors.push("Password is required");
    return errors;
  }
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }
  return errors;
};

const validatePhone = (phone) => {
  const errors = [];
  if (!phone || typeof phone !== "string") {
    return errors;
  }
  const trimmed = phone.trim();
  if (trimmed.length > 0 && !/^\+?[\d\s\-()]{7,20}$/.test(trimmed)) {
    errors.push("Please provide a valid phone number");
  }
  return errors;
};

module.exports = { validateName, validateEmail, validatePassword, validatePhone };
