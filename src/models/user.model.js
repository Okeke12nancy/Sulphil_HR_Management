const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    //FIRST NAME
    firstName: {
      type: String,
      minlength: [2, "First name must be at least 2 characters long"],
      maxlength: [30, "First name must be less than 30 characters"],
      required: true,
      trim: true,
    },

    //LAST NAME
    lastName: {
      type: String,
      minlength: [2, "Last name must be at least 2 characters long"],
      maxlength: [30, "Last name must be less than 30 characters"],
      required: true,
    },

    //EMAIL ADDRESS
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
      lowercase: true,
      trim: true,
    },

    // STAFF NUMBER
    staffNo: {
      type: String,
      required: true,
      maxlength: [10, "Phone number must be less than 11 characters"],
    },
    // PHONE NUMBER
    phoneNumber: {
      type: String,
      required: true,
      minlength: [11, "Phone number must be at least 11 characters long"],
      maxlength: [11, "Phone number must be less than 11 characters"],
    },

    //USER ROLE
    role: {
      type: String,
      required: true,
      trim: true,
      enum: ["admin", "hod", "staff"],
      default: "staff",
    },

    //USER POSITION
    position: {
      type: String,
      required: true,
      trim: true,
    },
    //USER PASSWORD
    password: {
      type: String,
      required: true,
      trim: true,
      alphanumeric: true,
    },
    //USER DATE OF BIRTH
    dob: {
      type: Date,
    },
    //USER DEPARTMENT
    department: {
      type: String,
      required: true,
      trim: true,
    },
    //DATE OF EMPLOYMENT
    employment_date: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  versionKey: false,

  transform(doc, ret) {
    delete ret.__v;
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

const User = mongoose.model("Users", userSchema);

// Export MOdel
// module.exports = User;
exports.User = User;
