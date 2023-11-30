const User = require("../../models/userModel");

const deleteUser = async (username) => {
  return User.deleteOne({ username });
};

module.exports = {
  deleteUser,
};
