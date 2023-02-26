const { User } = require("../models/user.model");

class UserService {
  async create(newUser) {
    const newUserData = await User.create(newUser);

    return newUserData;
  }

  async findOne(filter) {
    const user = await User.findOne(filter);

    return user;
  }

  async findById(id) {
    const user = await User.findById(id);

    return user;
  }

  async findAll(filter = {}) {
    const users = await User.find(filter);

    return users;
  }

  async update(id, updateData = {}) {
    const user = await User.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
      runValidators: true,
    });

    return user;
  }

  async delete(id) {
    const user = await User.findByIdAndRemove(id);
    return user;
  }
}

module.exports = new UserService();
