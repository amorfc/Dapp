const bcrypt = require('bcryptjs')

class AuthControler{
    static async hashPassword(password){
        return await bcrypt.hash(password, 10)   
    }
    static async comparePassword(userPassword,passwordFromDb){
        
    }
    static async encodeJwtToken(userInfo){

    }
    static async decodeJwtToken(jwtToken){

    }
}

module.exports = AuthControler