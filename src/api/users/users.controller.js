class UserController {
    static async register(req, res){

        const userFromBody = req.body
        
        console.log(req.body);
        res.json({
            "done":"done"
        })
    }
    static async login(req, res){
        
    }
}

module.exports = UserController