const User = require('../models/User')

class userController{
    async getUsers(req, res){
        const users = await User.find().select('-password');
        res.json(users);
    }

    deleteUsers(req, res){
        
    }

    blockUsers(req, res){

    }

    unblockUsers(req, res){

    }
}
module.exports = new userController;