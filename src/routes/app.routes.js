const userRouter = require("../routes/users.route");
const taskRouter = require("../routes/task.route");
const authRouter = require("../routes/auth");
const basePath = "/api/v1";

module.exports = (app) => {
  app.use(`${basePath}/auth`, authRouter);
  app.use(`${basePath}/user`, userRouter);
  app.use(`${basePath}/task`, taskRouter);
};
