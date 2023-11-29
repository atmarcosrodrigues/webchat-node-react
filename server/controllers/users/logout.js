const { requiredUserMessage } = require("./constants");

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: requiredUserMessage });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
