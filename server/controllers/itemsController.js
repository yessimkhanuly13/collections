const Collection = require('../models/Collection');
const Item = require('../models/Item');
const Tag = require('../models/Tag');

class itemsController{

    async getAllItems(req, res){
        try{
            const items = await Item.find();
            return res.json(items);
            
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async getItemsByUserId(req, res){
        try{
            const userId = req.params.id;
            const items = await Item.find({userId: userId});

            return res.json(items);

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async getItemById(req, res){
        try{
            const id = req.params.id;
            const item = await Item.findById(id);

            return res.json(item);
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

            return res.json({message: "Item updated!"})
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

            return res.json({message: "Item deleted succesfully!"})
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }

    }

    async addTag(req, res){
        try{
            console.log('Tag add to item:');
            const id = req.params.id;
            const {tag} = req.body;
            const item = await Item.findById(id);

            if(tag === ''){
                return res.status(400).json({message: "Tag can't be an empty!"})
            }

            const newTag = new Tag({value: tag});
            console.log(newTag);
            await newTag.save();
            
            item.tags.push(newTag._id);
            await item.save();
            console.log(item.tags);
            return res.json({message: "Tag succesfully added!"})

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }
}

module.exports = new itemsController;