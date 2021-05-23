const CardsDao = require('../../dao/cardsDao')
const Card = require('../../models/Card')


class CardsController {
    static async addCard(req, res) {
        try {
            const { authenticatedUser } = req
            const cardFromBody = req.body
            const newCard = new Card({
                ...cardFromBody,
                card_id: authenticatedUser.schoolNo,
            })

            const dbResult = await CardsDao.addCard(newCard)

            if (!dbResult.success) {
                res.status(401).json({ error: "Something went wrong while adding card" })
                return
            }

            res.json({
                message: "Card Added Successfully!!!"
            })

        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}

module.exports = CardsController