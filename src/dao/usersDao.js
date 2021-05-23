const { ObjectID } = require('bson')

let dapp
let users
let sessions

class UsersDao {
    static async injectDb(connection) {
        if (dapp) return

        try {
            dapp = await connection.db(process.env.MONGO_DB_DAPP_NAME)
            users = await connection.db(process.env.DB_NAME).collection(process.env.USERS_COLLECTION_NAME)
            sessions = await connection.db(process.env.DB_NAME).collection(process.env.SESSIONS_COLLECTION_NAME)
        } catch (error) {
            console.error(
                `Unable to establish a collection handle in moviesDAO: ${error}`,
            )
        }
    }
    static async addUser(newUserInfo) {
        try {
            const newUserDoc = {
                schoolNo: newUserInfo.schoolNo,
                password: newUserInfo.password,
                preferences: newUserInfo.preferences
            }
            await users.insertOne(newUserDoc)
            return { success: true }
        } catch (error) {
            if (error.code === 11000) {
                return {
                    error: "User Already Exists!!!"
                }
            }
            return { error: e }
        }
    }
    static async getUserWithSchoolNo(schoolNo) {
        const result = {
            data: null,
            success: null,
            error: null
        }
        try {
            const getUserResult = await users.findOne({ schoolNo: schoolNo })
            result.data = getUserResult
            result.success = true
        } catch (error) {
            result.error = error
        }
        return result
    }
    static async loginUser(user, userJwtToken) {
        try {
            await sessions.updateOne(
                { user_id: user.schoolNo },
                { $set: { jwt: userJwtToken } },
                { upsert: true }
            )
            return { success: true }
        } catch (error) {
            console.error(`Error occurred while logging in user, ${e}`)
            return { error: error }
        }
    }
    static async logoutUser(user) {
        try {
            const dbResult = await sessions.deleteOne({ user_id: user.schoolNo })
            console.log(dbResult);
            return { success: true }
        } catch (error) {
            console.error(`Error occurred while logout user, ${e}`)
            return { error: error }
        }
    }
}

module.exports = UsersDao