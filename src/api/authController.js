const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
class AuthControler {
    static async hashPassword(password) {
        return await bcrypt.hash(password, 10)
    }
    static async comparePassword(userPassword, hashedPasswordFromDb) {
        return await bcrypt.compare(userPassword, hashedPasswordFromDb)
    }
    static encoded(payload) {
        return jwt.sign(
            {
                ...payload
            },
            process.env.SECRET_KEY
        )
    }
    static decode(jwtToken) {
        return jwt.verify(jwtToken, process.env.SECRET_KEY, (error, result) => {

            if (error) {
                return error
            }
            return new User(result)
        })
    }
    static async verifyUserJwt(req, res, next) {
        const authorization = req.headers.authorization
        if (authorization) {
            const jwtTokenFromHeader = authorization.split(" ")[1]
            const user = AuthControler.decode(jwtTokenFromHeader)
            req.authenticatedUser = user
            next()
        } else {
            res.status(200).json({ error: "Auth Failed" })
        }
    }
}

module.exports = AuthControler