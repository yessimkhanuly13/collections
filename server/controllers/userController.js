class userController{
    getUsers(req, res){
        const user = {username:"uddd", password:'dsdsd'};
        res.json(user);
    }

    deleteUsers(req, res){

    }

    blockUsers(req, res){

    }
}
module.exports = new userController;