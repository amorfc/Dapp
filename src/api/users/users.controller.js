class UserController {
    static async register(req, res){

        const userFromBody = req.body
        //Validations must 
        //Add user to DB
        //Res send properly with filtered from cases
            //If user exixsts
            //If password wrong
            //If everything good
            //If unknown error occured
        console.log(req.body);
        res.json({
            "done":"done"
        })
    }
    static async login(req, res){
        
    }
}

module.exports = UserController