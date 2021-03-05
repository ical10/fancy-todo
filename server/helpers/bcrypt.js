const bcrypt = require('bcryptjs')

const hashPassword = (userPassword) => {
    let hashedPassword = bcrypt.hashSync(userPassword, 10)
    return hashedPassword
}

const comparePassword = (userPassword, hashedPassword) => {
    return bcrypt.compareSync(userPassword, hashedPassword)
}

module.exports = { hashPassword, comparePassword }
