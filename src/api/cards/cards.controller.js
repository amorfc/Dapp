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
    static async getCard(req, res) {
        try {
            const { authenticatedUser } = req

            const cardFromDbResult = await CardsDao.getCard(authenticatedUser.schoolNo)
            console.log(cardFromDbResult);
            if (!cardFromDbResult.success) {
                res.status(401).json({ error: "There is no card associate with this student " })
                return
            }
            const card = new Card(cardFromDbResult.data)
            res.json({
                data: card,
                message: "Fetched Card Successfully!!!"
            })

        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async updateCard(req, res) {
        try {
            const { authenticatedUser } = req

            const newCardInfoFromBody = req.body
            const dbResult = await CardsDao.updateCard(authenticatedUser.schoolNo, newCardInfoFromBody)
            
            if (!dbResult.success) {
                res.status(401).json({ error: "Something went wrong while updating card" })
                return
            }

            res.json({
                data:{},
                message: "Card Succesfully Updated"
            })

        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}

module.exports = CardsController