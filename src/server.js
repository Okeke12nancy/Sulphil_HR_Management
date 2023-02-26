const http = require("http");
require("colors");
const app = require("./app");
const logger = require("./config/logger.config");
const connectDB = require("./config/database.config");
const { seedAdmin } = require("./seed");

// http server instance
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

server.listen(PORT, async () => {
  logger.info(`Backend is blazing 🔥🔥🔥 @ port ${PORT}`.bold.yellow);
  // connecting to database
  await connectDB();
  //   console.log(`Backend is blazing 🔥🔥🔥 @ port ${PORT}`);
  // Seed Admin
  await seedAdmin();
});
