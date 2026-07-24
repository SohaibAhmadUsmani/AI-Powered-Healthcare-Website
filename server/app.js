const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { CLIENT_URL } = require("./config/env");
const passport = require("./config/passport");
const blogRoutes = require("./routes/blogRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(passport.initialize());

const authRoutes = require("./routes/auth.routes");
const oauthRoutes = require("./routes/oauth.routes");

app.use("/auth", authRoutes);
app.use("/auth", oauthRoutes);

const docRoutes = require("./routes/doctor.routes");

app.use("/api/doctors", docRoutes);

const labRoutes = require("./routes/labRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");

app.use("/api/lab", labRoutes);
app.use("/api/emergency", emergencyRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

const appointmentRoutes = require("./routes/appointment.routes");
app.use("/api/appointments", appointmentRoutes);

app.use("/api/blog", blogRoutes);
app.use("/api/contact", contactRoutes);

app.use((err, _req, res, _next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "AI Healthcare API is running.",
  });
});

module.exports = app;
