const server = require('./server.js')
const { MongoClient } = require('mongodb')
const UsersDao = require('./dao/usersDao.js')
const CoursesDao = require('./dao/coursesDao.js')
const BooksDao = require('./dao/booksDao.js')
const CardsDao = require('./dao/cardsDao.js')

const port = process.env.PORT

MongoClient.connect(
    process.env.MONGO_DB_DAPP_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 50,
    })
    .catch((error) => {
        console.log(`Error Occured When MongoDb Try Connect ${error}`)
        process.exit(1)
    })
    .then(async (mongoClient) => {
        //Do injections
        console.log(mongoClient.s.options)
        await UsersDao.injectDb(mongoClient)
        await CoursesDao.injectDb(mongoClient)
        await BooksDao.injectDb(mongoClient)
        await CardsDao.injectDb(mongoClient)
        server.listen(port, () => {
            console.log(`Listenint on port ${port}`);
        })
    })

