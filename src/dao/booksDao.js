
let dapp
let books

class BooksDao {
    static async injectDb(connection){
        if(dapp) return

        try {
            dapp = connection.db(process.env.DB_NAME)
            books = connection.db(process.env.DB_NAME).collection(process.env.BOOKS_COLLECTION_NAME)
        } catch (error) {
            console.error(
                `Unable to establish a collection handle in moviesDAO: ${error}`,
              )
        }
    }
}

module.exports =  BooksDao