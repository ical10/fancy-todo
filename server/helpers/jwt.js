const jwt = require('jsonwebtoken')
const SECRET_CODE = process.env.SECRET_CODE

const generateToken = (payload) => {
    const token = jwt.sign(payload, SECRET_CODE)
    return token
}

const checkToken = async (token) => {
    try {
        return decoded = jwt.verify(token, SECRET_CODE)
    }
    catch (err) {
        throw new Error("Not Authorised.")
    }
}


module.exports = {
    generateToken, checkToken
}
