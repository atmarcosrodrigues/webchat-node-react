const { usedUsernameMessage, usedEmailMessage } = require("./constants");
const { createUser } = require("../../services/databaseService/createUser");
const { findUser } = require("../../services/databaseService/getUser");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const usernameCheck = await findUser({ username });
    if (usernameCheck)
      return res.json({ msg: usedUsernameMessage, status: false });

    const emailCheck = await findUser({ email });
    if (emailCheck) return res.json({ msg: usedEmailMessage, status: false });

    const user = await createUser(req.body);
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
