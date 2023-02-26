const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.controller");
const { isAuthorized } = require("../middlewares/auth.middleware");

router.post("/register", isAuthorized("admin"), register);
router.post("/login", login);

module.exports = router;
