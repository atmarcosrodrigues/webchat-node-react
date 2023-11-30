const Messages = require("../../models/messageModel");

const findMessages = async (from, to) => {
  return await Messages.find({
    users: {
      $all: [from, to],
    },
  }).sort({ updatedAt: 1 });
};

module.exports = {
  findMessages,
};
