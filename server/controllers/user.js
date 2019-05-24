const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/dev");

exports.auth = function(req, res) {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(422).send({ errors: "Provide email and password!" });
  }
  User.findOne({ email }, (err, user2) => {
    if (err) {
      return res.status(422).send({ errors: "There was an error!" });
    }
    if (!user2) {
      return res
        .status(422)
        .send({ errors: "User doesn't exist, go and register!" });
    }
    return res.json(
      jwt.sign(
        {
          userId: user2.id,
          username: user2.username
        },
        config.SECRET,
        { expiresIn: "1h" }
      )
    );
  });
};

exports.register = function(req, res) {
  const { username, email, password, passwordConf } = req.body;
  if (!password || !email) {
    return res.status(422).send({ errors: "Provide email and password!" });
  }
  if (password !== passwordConf) {
    return res.status(422).send({ errors: "Passwords don't match!" });
  }

  User.findOne({ email }, (err, user2) => {
    if (err) {
      return res.status(422).send({ errors: "There was an error!" });
    }
    if (user2) {
      return res.status(422).send({ errors: "Email has been taken already!" });
    }

    const user = new User({
      username,
      password,
      email
    });
    user.save();
    return res.json({ registered: true });
  });
};

parseToken = token => {
  return jwt.verify(token.split(" ")[1], config.SECRET);
};

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    const user = parseToken(token);
    User.findById(user.userId);
    if (user) {
      res.locals.user = user;
      next();
    }
  } else {
    return res.status(422).send({ errors: "You need to login to get access" });
  }
};
