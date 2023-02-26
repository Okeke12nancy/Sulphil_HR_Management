const express = require("express");
const userController = require("../controllers/users.controller");
const { isAuthorized } = require("../middlewares/auth.middleware");
const userRouter = express.Router();

userRouter.post("/admin", isAuthorized("admin"), userController.createAdmin); // only for admin

userRouter.get("/", isAuthorized("admin", "hod"), userController.findAll);

userRouter.get("/:id", isAuthorized("admin", "hod"), userController.findById);

userRouter.put("/:id", isAuthorized("admin"), userController.update);

userRouter.delete("/:id", isAuthorized("admin"), userController.delete);

module.exports = userRouter;
