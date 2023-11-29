const { login } = require("../controllers/users/login");
const { register } = require("../controllers/users/registration");
const { getAllUsers } = require("../controllers/users/getAll");
const { setAvatar } = require("../controllers/users/setAvatar");
const { logOut } = require("../controllers/users/logout");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;
