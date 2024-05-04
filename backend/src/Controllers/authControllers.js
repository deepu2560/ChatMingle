const express = require("express");
const UserModel = require("../Models/User_Models");
const {
  UserAuthenticate,
  NewUserToken,
} = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", NewUserToken, async (req, res) => {
  try {
    console.log("request body :", req.body);
    res.status(200).send({ error: false, message: "ok", data: req.body });
  } catch (error) {
    console.log("server error :", error.message);
    res.status(500).send({ message: error.message, error: true });
  } finally {
    console.log("final message is from /auth/signup route");
  }
});

module.exports = router;
