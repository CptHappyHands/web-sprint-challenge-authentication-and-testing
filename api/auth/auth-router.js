const router = require("express").Router();
// const {restricted} = require('../middleware/restricted')
const bcrypt = require("bcrypt");
const tokenBuilder = require("./token-builder");
const {
  checkUsernameFree,
  checkUsernameExists,
} = require("../middleware/moreMiddleware");
const User = require("../jokes/jokes-model");

router.post("/register", checkUsernameFree, async (req, res, next) => {
  const { username, password } = req.body;
  // console.log(username, "here in register post");
  // res.json(req.body);
  try {
    const hash = bcrypt.hashSync(password, 8);
    const newUser = { username, password: hash };
    const user = await User.add(newUser);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }

  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post("/login", checkUsernameExists, (req, res, next) => {
  console.log(req.body.password, "in login");
  if (bcrypt.compareSync(req.body.password, req.users.password)) {
    const token = tokenBuilder(req.users);
    res.status(200).json({
      message: `welcome, ${req.users.username}`,
      token,
    });
  } else if (!req.body.username || !req.body.password) {
    next({
      status: 401,
      message: "username and password required",
    });
  } else {
    next({
      status: 401,
      message: "invalid credentials",
    });
  }
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
