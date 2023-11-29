const { getMessages } = require("../controllers/messages/getMessages");
const { addMessage } = require("../controllers/messages/addMessages");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);

module.exports = router;
