const { getAllUsers } = require("../../services/databaseService/getUser");

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers({ _id: { $ne: req.params.id } });
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};
