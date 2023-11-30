const { messageCreateSuccess, messageCreateFailure } = require("./constants");
const {
  createMessage,
} = require("../../services/databaseService/createMessage");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await createMessage(from, to, message);
    if (data) return res.json({ msg: messageCreateSuccess });
    else return res.json({ msg: messageCreateFailure });
  } catch (ex) {
    next(ex);
  }
};
