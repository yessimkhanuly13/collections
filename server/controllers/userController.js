const User = require('../models/User');
const Role = require('../models/Role')

class userController{
    async getUsers(req, res){
        try{
            const users = await User.find().select('-password');
            res.json(users);
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async deleteUsers(req, res){
        try{
            const userId = req.params.id;
            await User.findByIdAndRemove(userId);

            res.json({message: "User is deleted succesfully!"});

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async  blockUsers(req, res){
        try{
            const userId = req.params.id;
            await User.findByIdAndUpdate(userId, {blocked: "Blocked"}, {new: true});

            res.json({message: "User is blocked!"})

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async unblockUsers(req, res){
        try{
            const userId = req.params.id;
            await User.findByIdAndUpdate(userId, {blocked: ""}, {new : true});

            res.json({message: "User is unblocked!"})
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async getAdmin(req, res){
        try{
            const userId = req.params.id;
            const adminRole = await Role.findOne({value: 'admin'});
            const updatedUser = await User.findByIdAndUpdate(userId, {roles:[adminRole.value]}, {new: true});

            console.log(await User.findById(userId));
            res.json({message: "User succesfully get admin role!"})

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }


    async removeAdmin(req, res){
        try{
            const userId = req.params.id;
            const userRole = await Role.findOne({value: 'user'});
            await User.findByIdAndUpdate(userId, {role: [userRole.value]}, {new: true});

            res.json({message: "User succesfully get user role!"})

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }
}
module.exports = new userController;