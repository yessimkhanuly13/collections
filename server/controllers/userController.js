const User = require('../models/User');
const Role = require('../models/Role');
const Collection = require('../models/Collection');
const Item = require('../models/Item');

class userController{

    async getAllUsers(req, res){
        try{
            const users = await User.find().select('-password');
           
            return res.json(users);

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }


    async getUser(req, res){
        try{
            const username = req.params.id;
           
            const user = await User.find({username: username}).select('-password');

            return res.json(user);
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async deleteAllUserItems(req, res, next){
        try{
            const userId = req.params.id;
            const items = await Item.find({userId: userId});

            for(const item of items){
                await Item.findByIdAndRemove(item._id);
            }

            next();
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async deleteAllUserCollections(req, res, next){
        try{    
            const userId = req.params.id;
            const collections = await Collection.find({userId: userId});
            
            for(const collection of collections){
                await Collection.findByIdAndRemove(collection._id);
            }

            next();

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async deleteUser(req, res){
        try{
            const userId = req.params.id;
            await User.findByIdAndRemove(userId);

            return res.json({message: "User is deleted succesfully!"});

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async  blockUser(req, res){
        try{
            const userId = req.params.id;
            await User.findByIdAndUpdate(userId, {blocked: "Blocked"}, {new: true});

            return res.json({message: "User is blocked!"})

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async unblockUser(req, res){
        try{
            const userId = req.params.id;
            await User.findByIdAndUpdate(userId, {blocked: ""}, {new : true});

            return res.json({message: "User is unblocked!"})
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async getAdmin(req, res){
        try{
            const userId = req.params.id;
            const adminRole = await Role.findOne({value: 'admin'});

            const user = await User.findById(userId);
            if(!user.roles.includes(adminRole.value)){
                user.roles.push(adminRole.value);
            }

            await user.save();
            console.log(user);

            return res.json({message: "User succesfully get admin role!"})

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }


    async removeAdmin(req, res){
        try{
            const userId = req.params.id;
            const adminRole = await Role.findOne({value: 'admin'});

            const user = await User.findById(userId);
            const updatedRoles = user.roles.filter((role) => role !== adminRole.value);
            
            user.roles = updatedRoles;
            
            await user.save();

            return res.json({message: "User succesfully get user role!"})

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }
}
module.exports = new userController;