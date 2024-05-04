const jwt = require("jsonwebtoken");
// Authorization;

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
  console.log("New User Authentication");
  return next();
};

const UserAuthenticate = async (req, res, next) => {
  console.log("Authenticate middleware");
  return next();
};

module.exports = { UserAuthenticate, NewUserToken };
