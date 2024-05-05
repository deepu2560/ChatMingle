const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User_Models");
const { validationResult } = require("express-validator");

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_TOKEN);
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_TOKEN),
      (error, user) => {
        if (error) reject(error);
        resolve(user);
      };
  });
};

const NewUserToken = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: true, message: "Error! try again" });
    }

    let user = await UserModel.findOne({ email_id: req.body.email_id });

    if (user) {
      return res.status(400).send({
        error: true,
        message: "Email id already registered to some other account.",
      });
    }

    user = req.body;
    const token = newToken(user);

    req.token = token;
  } catch (error) {
    console.log("server error at new user token :", error);
    res.status(500).send({ error: true, message: error.message });
  } finally {
    next();
  }
};

const UserAuthenticate = async (req, res, next) => {
  try {
    const result = validationResult(req);

    if (result) {
      return res.status(400).send({ error: true, message: "Error! try again" });
    }

    if (!req.headers.Authorization) {
      return req
        .status(400)
        .send({ error: true, message: "Token is not provided or invalid" });
    }

    if (!req.headers.Authorization.startWith("Bearer")) {
      return req
        .status(400)
        .send({ error: true, message: "Token is not provided or invalid" });
    }

    const token = req.headers.Authorization.split(" ")[1];

    let user = await verifyToken(token);

    req.user = user.user;
  } catch (error) {
    console.log("server error at user authenticate :", error.message);
    res.status(500).send({ error: true, message: error.message });
  } finally {
    next();
  }
};

module.exports = { UserAuthenticate, NewUserToken, newToken };
