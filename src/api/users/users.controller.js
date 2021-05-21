class UserController {
    static async register(req, res){
        console.log(req);
        res.json({
            "done":"done"
        })
    }
    static async login(req, res){
        
    }
}

module.exports = UserController