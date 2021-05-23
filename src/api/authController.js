const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
class AuthControler {
    static async hashPassword(password) {
        return await bcrypt.hash(password, 10)
    }
    static async comparePassword(userPassword, passwordFromDb) {

    }
    static encoded(payload) {
        return jwt.sign(
            {
                ...payload
            },
            process.env.SECRET_KEY
        )
    }
    static async decode(jwtToken) {

    }
    // static async verifyUserJwt()
}

module.exports = AuthControler