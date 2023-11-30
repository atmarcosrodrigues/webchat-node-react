const bcrypt = require("bcrypt");
const { invalidUserMessage } = require("./constants");
const { findUser } = require("../../services/databaseService/getUser");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await findUser({ username });
    if (!user) return res.json({ msg: invalidUserMessage, status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: invalidUserMessage, status: false });
    delete user.password;

    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
