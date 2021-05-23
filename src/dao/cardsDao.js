let dapp
let cards

class CardsDao {
    static async injectDb(connection) {
        if (dapp) return

        try {
            dapp = connection.db(process.env.DB_NAME)
            cards = connection.db(process.env.DB_NAME).collection(process.env.CARDS_COLLECTION_NAME)
        } catch (error) {
            console.error(
                `Unable to establish a collection handle in moviesDAO: ${error}`)
        }
    }
    static async addCard(card) {
        try {
            await cards.insertOne(card)
            return { success: true }
        } catch (error) {
            return { error: error }
        }
    }
    static async getCard(schoolNo) {
        try {
            const response = await cards.findOne({ card_id: schoolNo })
            return {
                success: true,
                data: response
            }
        } catch (error) {
            return { error: error }
        }
    }
    static async updateCard(schoolNo, newCard) {
        try {
            const result = await cards.updateOne(
                { card_id: schoolNo },
                { $set: { ...newCard } },
            )
            if (result.result.n > 0) {
                return { success: true }
            }
            return { success: false }
        } catch (error) {
            return { error: error }
        }
    }
}

module.exports = CardsDao