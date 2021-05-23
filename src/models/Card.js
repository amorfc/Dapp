class Card {
    constructor({card_id, id_hex, decimal, mifaresize, mifaresectors, mifareblock} = {}){
        this.card_id = card_id
        this.id_hex = id_hex
        this.decimal = decimal 
        this.mifaresize = mifaresize
        this.mifaresectors = mifaresectors
        this.mifareblock = mifareblock
    }
}

module.exports = Card