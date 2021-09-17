const { findBy } = require('../jokes/jokes-model')

const checkUsernameExists = async (req, res, next) => {
    try {
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

module.exports = {checkUsernameExists}