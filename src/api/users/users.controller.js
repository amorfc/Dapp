const UsersDao = require('../../dao/usersDao.js')
const User = require('../../models/User')
const { hashPassword } = require('../../utils.js')
const AuthControler = require('../authController.js')
class UserController {
    static async register(req, res) {
        try {
            const errors = {}
            const userFromBody = req.body
            //Validations must 
            //Add user to DB
            const setUser = {
                ...userFromBody,
                password: await AuthControler.hashPassword(userFromBody.password)
            }

            const dbResult = await UsersDao.addUser(setUser)

            if (!dbResult.success) {
                errors.message = insertResult.error
            }
            if (Object.keys(errors).length > 0) {
                res.status(400).json(errors)
                return
            }

            const newUserFromDb = await UsersDao.getUserWithSchoolNo(userFromBody.schoolNo)

            const user = new User(newUserFromDb.data)
            console.log(`user class user  ${JSON.stringify(user)}`);
            // //Res send properly with filtered from cases
            // //If password wrong

            res.json({
                data:user.toJson(),
                message: "User Created Succesfully"
            })

        } catch (error) {
            res.status(500).json({ error })
        }
    }
    static async login(req, res) {

    }
}

module.exports = UserController