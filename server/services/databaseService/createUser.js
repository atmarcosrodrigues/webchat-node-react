const bcrypt = require("bcrypt");
const User = require("../../models/userModel");

const createUser = async (userData) => {
  const { username, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    username,
    password: hashedPassword,
  });
  delete user.password;
  return user;
};

module.exports = {
  createUser,
};
