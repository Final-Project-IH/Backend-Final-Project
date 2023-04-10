const User = require("../models/User.model");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

module.exports.login = (req, res, next) => {
  const loginError = createError(
    StatusCodes.UNAUTHORIZED,
    "Email or password incorrect"
  );
  const { username, password } = req.body;
  if (!username || !password) {
    return next(loginError);
  }

  // Check username
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return next(loginError);
      }

      // Check password
      return user.checkPassword(password).then((match) => {
        if (!match) {
          return next(loginError);
        }

        // Emitir y firmar un token jwt con la info del usuario
        const token = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET || "test",
          {
            expiresIn: "1d",
          }
        );

        res.json({ accessToken: token });
      });
    })
    .catch(next);
};
