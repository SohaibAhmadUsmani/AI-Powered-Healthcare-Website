const app = require("./app");
const { connectDB } = require("./config/db");
const { PORT } = require("./config/env");
const appointmentRoutes = require("./routes/appointment.routes");

const start = async () => {
  await connectDB();

  app.use("/api/appointments", appointmentRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();