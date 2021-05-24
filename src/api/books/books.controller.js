const BooksDao = require("../../dao/booksDao")

class BooksController {
    static async getAllBooks(req, res) {
        try {
            const { authenticatedUser } = req
            const allBooksFromDbResult = await BooksDao.getAllBooks(authenticatedUser.schoolNo)
            if (!allBooksFromDbResult.success) {
                res.status(401).json({ error: allBooksFromDbResult.error })
                return
            }

            res.json({
                data: allBooksFromDbResult.data,
                message: "All books fetched Succesfully!!!"
            })

        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}

module.exports = BooksController