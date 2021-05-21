const server = require('./server.js')
const { MongoClient } = require('mongodb')
const UsersDao = require('./dao/usersDao')

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
        await UsersDao.injectDb(mongoClient)
        server.listen(port, () => {
            console.log(`Listenint on port ${port}`);
        })
    })

