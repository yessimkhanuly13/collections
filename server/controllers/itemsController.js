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


    async addTag(req, res, next){
        try{
            const {tag} = req.body;
            const existTag = await Tag.findOne({value:tag});

            if(!existTag){
                const newTag = new Tag({value: tag});
                await newTag.save();
                req.tagId = newTag._id;
            }else{
                req.tagId = existTag._id;
            }

            console.log(req.tagId);
            next();

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async addTagToItem(req, res){
        try{
            const {tagId} = req;
            const id = req.params.id;
            const updatedItem = await Item.findById(id);

            updatedItem.tags.push(tagId);
            await updatedItem.save();

            return res.json({message: "Tag succesfully added!"})
          
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }
}

module.exports = new itemsController;