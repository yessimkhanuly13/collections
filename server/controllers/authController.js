const User = require('../models/User');
const bcrypt = require('bcrypt');

class authController{
    async login(req, res){
        try{
            const {username, password} = req.body;
            const user = await User.findOne({username})

            if(!user){
                return res.status(400).json({message:"User not found!"});
            }

            const validPass = bcrypt.compareSync(password, user.password);

            if(!validPass){
                return res.status(400).json({message:"Password isn't correct!"})
            }

            user.password = 'encrypted';
            
            return res.json(user);
            
        }catch(e){
            console.log(e);
            res.status(400).json({message:'Login Error!'})
        }

    }

    async registration(req, res){
        try{
            const {username, password} = req.body;

            const isUserExist = await User.findOne({username});

            if(isUserExist){
                return res.status(400).json({message: "User already exist!"})
            }

            const cryptedPass = bcrypt.hashSync(password, 5);
            const user = new User({username, password:cryptedPass});

            await user.save();
            return res.json({message:"User is succesfully created!"})

        }catch(e){
            console.log(e);
            res.status(400).json({message:'Registration error!'})
        }
    }
}

module.exports = new authController;