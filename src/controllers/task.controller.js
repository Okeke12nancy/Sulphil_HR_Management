const taskService = require("../services/task.service");
const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { taskSchema } = require("../middlewares/validate");

class TaskController {
  async create(req, res, next) {
    try {
      await taskSchema.validateAsync({ ...req.body });

      const { assignedTo, description, deadline } = req.body;

      const newTask = await taskService.create({
        assignedTo,
        description,
        deadline,
        createdBy: req?.hod?._id || req?.admin?._id,
        assignedBy: req?.hod?._id || req?.admin?._id,
      });

      return res.status(201).send({
        success: true,
        message: "created tasks",
        data: newTask,
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
  async findById(req, res, next) {
    const task = await taskService.findById(req.params.id);

    if (!task) {
      return res.status(404).send({
        success: false,
        message: "task not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "task found",
      data: task,
    });
  }

  async findAll(req, res) {
    const tasks = await taskService.findAll({});

    console.log(req.hod);

    return res.status(200).send({
      success: true,
      message: "tasks found",
      data: tasks,
    });
  }

  async update(req, res) {
    const task = await taskService.update(req.params.id, req.body);
    if (!task) {
      return res.status(404).send({
        success: false,
        message: "task not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "task updated successfully",
      data: task,
    });
  }

  async delete(req, res) {
    const task = await taskService.delete(req.params.id);

    return res.status(200).send({
      success: true,
      message: "task deleted successfully",
    });
  }
}

module.exports = new TaskController();
