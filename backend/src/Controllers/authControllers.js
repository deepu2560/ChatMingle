const express = require("express");
const { body } = require("express-validator");
const UserModel = require("../Models/User_Models");
const {
  UserAuthenticate,
  NewUserToken,
  newToken,
} = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/signup",
  body("email_id").isEmail(),
  body("username").notEmpty().isString(),
  body("full_name").notEmpty().isString(),
  NewUserToken,
  async (req, res) => {
    try {
      if (!req.token) {
        return;
      }

      let user = await UserModel.create(req.body);

      if (!user) {
        return res
          .status(400)
          .send({ error: true, message: "Error! try again" });
      }

      res.status(200).send({
        error: false,
        message: "ok",
        data: { user, token: req.token },
      });
    } catch (error) {
      console.log("server error :", error.message);
      res.status(500).send({ message: error.message, error: true });
    } finally {
      console.log("final message is from /auth/signup route");
    }
  },
);

router.post(
  "/signin",
  body("username").notEmpty().isString(),
  async (req, res) => {
    try {
      let user = await UserModel.findOne({ username: req.body.username });

      if (!user) {
        return res.status(404).send({
          error: true,
          message: "Please check your email or password",
        });
      }

      let match = user.checkPassword(req.body.password);

      if (!match) {
        console.log("Please check your email or password");
        return res
          .status(400)
          .send({ message: "Please check your email or password" });
      }

      const token = newToken(user);

      res.status(200).send({
        error: false,
        message: "ok",
        data: { user, token: token },
      });
    } catch (error) {
      console.log("server error :", error.message);
      res.status(500).send({ message: error.message, error: true });
    } finally {
      console.log("final message is from /auth/signup route");
    }
  },
);

module.exports = router;
