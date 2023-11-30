const User = require("../../models/userModel");

const findByIdAndUpdate = async (userId, avatarImage) => {
  return User.findByIdAndUpdate(
    userId,
    {
      isAvatarImageSet: true,
      avatarImage,
    },
    { new: true }
  );
};

module.exports = {
  findByIdAndUpdate,
};
