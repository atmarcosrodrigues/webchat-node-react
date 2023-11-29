const Messages = require("../../models/messageModel");
const { messageCreateSuccess, messageCreateFailure } = require("./constants");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: messageCreateSuccess });
    else return res.json({ msg: messageCreateFailure });
  } catch (ex) {
    next(ex);
  }
};
