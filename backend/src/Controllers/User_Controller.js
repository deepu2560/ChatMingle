const express = require("express");

const UserModel = require("../Models/User_Models");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let user = await UserModel.findOne({ email_id: req.body.email_id });

    if (user) {
      console.log(`User already exist: ${req.body.email_id}`);
      res.status(400).send({ error: "User already exist" });
    }

    user = await UserModel.create(req.body);

    res.status(200).send({ user });
  } catch (error) {
    console.log(`While registering new user something went wrong: ${error}`);
    res.status(500).send({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await UserModel.findOne({ email_id: req.body.email_id });

    if (!user) {
      res.status(404).send({ error: "Check email and password" });
    }

    match = UserModel.checkPassword(req.body.password);

    if (!match) {
      res.status(400).send({ error: "Check email and passworld" });
    }

    res.status(200).send({ user });
  } catch (error) {
    console.log(`login user something went wrong: ${error}`);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
