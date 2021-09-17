const { findBy } = require('../jokes/jokes-model')
const User = require('../jokes/jokes-model')

const checkUsernameExists = async (req, res, next) => {
  console.log(req.body)
    try {
      console.log(req.body)
        const [users] = await findBy({ username: req.body.username})
        if(!users) {
            next({
                status: 401,
                message: 'invalid credentials'
            })
        } else {
            req.users = users
            next()
        }
    } catch (err) {
        next(err)
    }
}

// function checkPasswordLength(req, res, next) {
//   console.log(req.body, 'here')
//     if (!req.body.password || req.body.password.length < 3) {
//       next({
//         message: "Password must be longer than 3 chars",
//         status: 422,
//       });
//     } else {
//       next();
//     }
//   }

  async function checkUsernameFree(req, res, next) {
    try {
      const users = await User.findById({ id: req.body.id });
      if (!users.length) {
        next();
      } else {
        next({ status: 422, message: "Username taken" });
      }
    } catch (err) {
      next(err);
    }
  }

module.exports = {checkUsernameExists, checkUsernameFree}