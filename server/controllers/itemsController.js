const Collection = require('../models/Collection');
const Item = require('../models/Item')

class itemsController{

    async getAllItems(req, res){
        try{
            const items = await Item.find();
            res.json(items);
            
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async getItemsByUserId(req, res){
        try{
            const userId = req.params.id;
            const items = await Item.find({userId: userId});

            res.json(items);

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async getItemById(req, res){
        try{
            const id = req.params.id;
            const item = await Item.findById(id);

            res.json(item);
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

    async deleteFromCollection(req, res){
        try{
            const id = req.params.id;
            const item = await Item.findById(id);
            const collection = await Collection.findById(item.collectionId);

            const updatedItems = collection.items.filter((item)=>item._id !== id);
            collection.items = updatedItems;
            await collection.save();

            next();

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