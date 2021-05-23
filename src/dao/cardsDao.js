

let dapp
let cards

class CardsDao {
    static async injectDb(connection){
        if(dapp) return

        try {
            dapp =  connection.db(process.env.DB_NAME)
            cards =  connection.db(process.env.DB_NAME).collection(process.env.CARDS_COLLECTION_NAME)
        } catch (error) {
            console.error(
                `Unable to establish a collection handle in moviesDAO: ${error}`)
        }
    }
}

module.exports = CardsDao