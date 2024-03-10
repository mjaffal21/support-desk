const express = require("express");
const { SignUp, SignIn, GetMe } = require("../controllers/usersController");
const { Protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", SignUp);
router.post("/login", SignIn);
router.get("/getMe", Protect, GetMe);

module.exports = router;
