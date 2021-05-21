const { ObjectID } = require('bson')

let dapp
let users

class UsersDao {
    static async injectDb(connection) {
        if (dapp) {
            return
        }

        try {
            dapp = await connection.db(process.env.MONGO_DB_DAPP_NAME)
            users = await connection.db(process.env.DB_NAME).collection(process.env.USERS_COLLECTION_NAME)
        } catch (error) {
            console.error(
                `Unable to establish a collection handle in moviesDAO: ${error}`,
              )
        }
    }
}

module.exports = UsersDao