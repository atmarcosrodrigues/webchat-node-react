const Messages = require("../../models/messageModel");

const createMessage = async (from, to, message) => {
  return await Messages.create({
    message: { text: message },
    users: [from, to],
    sender: from,
  });
};

module.exports = {
  createMessage,
};
