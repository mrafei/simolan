const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ users: "respond with a resource" });
});

router.post("/signup", [], userController.signup);
router.post("/login", [], userController.login);
module.exports = router;
