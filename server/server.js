const { PORT } = require("./config/env");
const app = require("./app");
const { connectDB } = require("./config/db");

const start = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();