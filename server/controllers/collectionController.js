const Collection = require('../models/Collection');
const Item = require('../models/Item');

class collectionController{
    
    async getAllCollections(req, res){
        try{

            const collections = await Collection.find();

            res.json(collections);
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async getCollectionsByUserId(req, res){
        try{

            const userId = req.params.id;
            const collections = await Collection.find({userId: userId})

            res.json(collections);

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }

    }

    async getCollectionById(req, res){
        try{

            const id = req.params.id;
            const collection = await Collection.findById(id);

            res.json(collection)

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async add(req, res){
        try{
            
            const{name, description, theme, userId} = req.body;
            console.log(req.body)
            const collection = new Collection({name, description, theme, items:[], userId});
            await collection.save();

            res.json({message: "Collection succesfully added!"})

        }catch(e){
            console.log(e);
        }
    }


    async update(req, res){
        try{

            const id = req.params.id;
            const {name, description, theme} = req.body;

            const collection = await Collection.findById(id);
            
            collection.name = name;
            collection.description = description;
            collection.theme = theme;

            await collection.save();

            res.json({message: "Collection succesfully updated!"})


        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }


    async addItemToCollection(req, res){
        try{    
            const id = req.params.id;
            const {topic, desc, userId, tags} = req.body
            const date = Date.now();

            const item = new Item({topic, desc, userId, tags, createdDate: date, collectionId: id});
            await item.save();  

            const collection = await Collection.findById(id);
            collection.items.push(item);
            await collection.save();
          
            res.json({message: "Item succesfully added!"});

        }catch(e){
            console.log(e);
            res.json({message: 'Something went wrong!'})
        }

    }

    async updateItemInCollection(req, res){
        try{
            const id = req.params.id;
            const {topic, desc, tags, itemId} = req.body;

            const collection = await Collection.findById(id);
            const item = await Item.findById(itemId);
             
            item.topic = topic;
            item.desc = desc;
            item.tags = tags;

            await item.save();

            const updatedItems = collection.items.filter((item) => item._id !== itemId);
            updatedItems.push(item);
            collection.items = updatedItems;
            collection.save();
            
            res.json({message: "Item succesfully updated!"})

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async deleteItems(req, res, next){
        try{
            console.log('Deleting items')
            const id = req.params.id;

            const collection = await Collection.findById(id);
            
           for(const item of collection.items){
                await Item.findByIdAndRemove(item._id);
           }

            collection.items = [];
            await collection.save();
            next();
        }
        catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async delete(req, res){
        try{

            const id = req.params.id;
            console.log(id);
            await Collection.findByIdAndRemove(id);

            res.json({message: "Collection succefully deleted!"});

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

}

module.exports = new collectionController;