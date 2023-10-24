const User = require('../models/User');

class authController{
    async login(req, res){
        try{
            const {username, password} = req.body;
        
            
        }catch(e){
            console.log(e);
            res.status(400).json({message:'Login Error!'})
        }

    }

    async registration(req, res){
        try{
            const {username, password} = req.body;

            const user = new User({username, password});

            await user.save();
            return res.json({message:"User is succesfully created!"})

        }catch(e){
            console.log(e);
            res.status(400).json({message:'Registration error!'})
        }
    }
}

module.exports = new authController;