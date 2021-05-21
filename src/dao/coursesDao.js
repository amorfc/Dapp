const { ObjectID } = require('bson')

let dapp
let courses

class CoursesDao {
    static async injectDb(connection){
        if(dapp)return
        
        try {
            dapp = connection.db(process.env.DB_NAME)
            courses = connection.db(process.env.DB_NAME).collection(COURSES_COLLECTION_NAME)
        } catch (error) {
            console.error(
                `Unable to establish a collection handle in moviesDAO: ${error}`)
        }
    }
}

module.exports = CoursesDao