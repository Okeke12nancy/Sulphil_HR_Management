const userService = require("../services/user.service");
const { BadRequestError } = require("../errors");

const { adminSchema } = require("../middlewares/validate");

class UserController {
  async createAdmin(req, res) {
    try {
      await adminSchema.validateAsync({ ...req.body });
      const userExists = await userService.findOne({
        email: req.body.email,
      });
      if (userExists) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: false,
          message: "User already exists",
        });
      }
      const newUser = await userService.create({ ...req.body, role: "admin" });

      return res.status(201).send({
        success: true,
        message: "Admin user created successfully",
        data: newUser,
      });
    } catch (error) {
      if (error.isJoi === true) {
        error.statuscode = StatusCodes.BAD_REQUEST;
        return next(error);
      }
      return res.status(500).json({
        status: false,
        message: "Something went wrong, try again",
      });
    }
  }

  // Find One
  async findById(req, res) {
    const user = await userService.findById(req.params.id);
    // const user = await userService.findOne({ firstName: req.params.name });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "UserFound",
      data: user,
    });
  }

  async findAll(req, res) {
    const users = await userService.findAll({});

    if (!users) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Users found",
      data: users,
    });
  }

  async update(req, res) {
    const user = await userService.update(req.params.id, req.body);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user details updated successfully",
      data: user,
    });
  }

  async delete(req, res) {
    const user = await userService.delete(req.params.id);

    return res.status(200).send({
      success: true,
      message: "user deleted successfully",
    });
  }
}

module.exports = new UserController();
