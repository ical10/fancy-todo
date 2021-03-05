const { checkToken } = require('../helpers/jwt')
const { User, Todo } = require('../models')

const authenticate = async (req, res, next) => {
    try {
        const decoded = await checkToken(req.headers.access_token)
        const find = await User.findOne({
            where: {
                email: decoded.email
            }
        })

        if (!find) {
            res.status(401).json({
                message: "Please register first!"
            })
        }
        else {
            req.user = {
                id: find.id
            }
            next()
        }
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

const authorize = (req, res, next) => {

    Todo.findOne({
        where: {
            id: +req.params.id
        }
    })
        .then(todo => {
            if (!todo) {
                next({ name: "ResourceNotFound" })
            }
            else if (todo.UserId !== req.user.id) {
                next({ name: "AuthorisationError" })
            }
            else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = {
    authenticate, authorize
}

