let dapp
let books
class BooksDao {
    static async injectDb(connection) {
        if (dapp) return

        try {
            dapp = connection.db(process.env.DB_NAME)
            books = connection.db(process.env.DB_NAME).collection(process.env.BOOKS_COLLECTION_NAME)
        } catch (error) {
            console.error(
                `Unable to establish a collection handle in moviesDAO: ${error}`,
            )
        }
    }
    static async getAllBooks(schoolNo) {
        try {
            const filter = {
                'borrower_schoolNo':schoolNo
            }
            const response = await books.find(filter).toArray()
            return {
                data: response,
                success: true
            }
        } catch (error) {
            return { error: error }
        }
    }
}

module.exports = BooksDao