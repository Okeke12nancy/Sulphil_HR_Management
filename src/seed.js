const logger = require("./config/logger.config");
const userService = require("./services/user.service");

const seedAdmin = async () => {
  const admin = {
    firstName: "admin",
    lastName: "admin",
    email: "admin@yopmail.com",
    password: "admin12345",
    dob: "12:12:1996",
    role: "admin",
    position: "Admin",
    department: "Administration",
    phoneNumber: "08011111111",
    staffNo: "0000000001",
    employment_date: "12:02:2002",
  };

  const adminExists = await userService.findOne({ role: "admin" });
  if (!adminExists) {
    await userService.create(admin);
    logger.info("Admin seeded successfully");
    return;
  }
  logger.info("Admin already seeded");
  return;
};

module.exports = {
  seedAdmin,
};
