const User = require('../models/User');
const Role = require('../models/Role')

class userController{
    async getUser(req, res){
        try{
            const username = req.params.id;
            console.log(req.params)
           
            const user = await User.find({username: username}).select('-password');

            res.json(user);
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async deleteUser(req, res){
        try{
            const userId = req.params.id;
            await User.findByIdAndRemove(userId);

            res.json({message: "User is deleted succesfully!"});

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async  blockUser(req, res){
        try{
            const userId = req.params.id;
            await User.findByIdAndUpdate(userId, {blocked: "Blocked"}, {new: true});

            res.json({message: "User is blocked!"})

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async unblockUser(req, res){
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
            await User.findByIdAndUpdate(userId, {roles:[adminRole.value]}, {new: true});

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