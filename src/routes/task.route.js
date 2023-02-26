const express = require("express");
const taskController = require("../controllers/task.controller");
const { isHOD, isAuthorized } = require("../middlewares/auth.middleware");
const taskRouter = express.Router();

taskRouter.post("/", isAuthorized("hod"), taskController.create);

taskRouter.get("/", isAuthorized("hod", "staff"), taskController.findAll);

taskRouter.get("/:id", taskController.findById);

taskRouter.patch("/:id", isAuthorized("hod"), taskController.update);

taskRouter.delete("/:id", isAuthorized("hod"), taskController.delete);

module.exports = taskRouter;
