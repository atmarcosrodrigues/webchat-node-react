const User = require("../../models/userModel");

const findUser = async (userData) => {
  return await User.findOne(userData);
};

const getAllUsers = async (id) => {
  return await User.find(id).select([
    "email",
    "username",
    "avatarImage",
    "_id",
  ]);
};

module.exports = {
  findUser,
  getAllUsers,
};
