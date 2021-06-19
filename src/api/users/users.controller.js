const UsersDao = require('../../dao/usersDao.js')
const User = require('../../models/User')
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
            // //Res send properly with filtered from cases
            // //If password wrong

            res.json({
                data: user.toJson(),
                message: "User Created Succesfully"
            })

        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async login(req, res) {
        try {
            const errors = {}
            const userFromBody = req.body
            //Validations must happen here

            const userFromDbResult = await UsersDao.getUserWithSchoolNo(userFromBody.schoolNo)

            if (!userFromDbResult.success) {
                res.status(401).json({ error: "Make sure your email is correct." })
                return
            }

            const user = new User(userFromDbResult.data)

            if (!(await AuthControler.comparePassword(userFromBody.password, user.password))) {
                res.status(500).json({ error: "Password is wrong" })
                return
            }

            const currentUserToken = await AuthControler.encoded()
            const loginResponse = await UsersDao.loginUser(user, currentUserToken)

            if (!loginResponse.success) {
                res.status(401).json({ error: "Credentials Is not true" })
                return
            }

            if (Object.keys(errors).length > 0) {
                res.status(400).json(errors)
                return
            }

            res.json({
                data: await AuthControler.encoded(user.toJson()),
                message: "Succesfully Logged In",
                isAuthenticated: true
            })

        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async logout(req, res) {
        try {

            const userFromBody = req.body

            const logoutResponse = await UsersDao.logoutUser(userFromBody)
            if(!logoutResponse.success){
                res.status(401).json({
                    error:"User could not logout succesfully!!!"
                })
            }
            res.json({
                data:"Yup!",
                message:"Successfully logged out!!!"
            })

        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}

module.exports = UserController