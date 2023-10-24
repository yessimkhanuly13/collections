const Item = require('../models/Item')

class itemsController{

    async get(req, res){
        try{
            const userId = req.query.id;
            const items = await Item.find({userId: userId});

            res.json(items);

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async add(req, res){
        try{
            const {topic, desc, userId} = req.body;

            const item = new Item({topic, desc, userId});
            await item.save();
            
            return res.json({message: "Item succesfully added!"})

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async update(req, res){
        try{
            const id = req.params.id;
            const {desc, topic} = req.body;

            await Item.findByIdAndUpdate(id, {desc: desc, topic: topic}, {new: true});

            res.json({message: "Item updated!"})
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async delete(req, res){
        try{
            const id = req.params.id;
            await Item.findByIdAndRemove(id);

            res.json({message: "Item deleted succesfully!"})
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }

    }
}

module.exports = new itemsController;