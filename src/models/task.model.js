const mongoose = require("mongoose");
const { Schema } = mongoose;
const taskSchema = new Schema(
  {
    assignedBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: [true, "Who's assigning this task"],
    },
    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: [true, "Who is this task assigned to?"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: 50,
      minlength: 3,
    },
    done: {
      type: String,
      default: false,
    },
    deadline: {
      type: Date,
    },
    doneAt: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

taskSchema.set("toJSON", {
  versionKey: false,

  transform(doc, ret) {
    delete ret.__v;
  },
});

const Task = mongoose.model("Task", taskSchema);

exports.Task = Task;
