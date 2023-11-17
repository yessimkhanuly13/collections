const Collection = require('../models/Collection');
const Item = require('../models/Item');

class collectionController{
    
    async getAllCollections(req, res){
        try{

            const collections = await Collection.find();

            return res.json(collections);
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async getCollectionsByUserId(req, res){
        try{

            const userId = req.params.id;
            const collections = await Collection.find({userId: userId})

            return res.json(collections);

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }

    }

    async getCollectionById(req, res){
        try{

            const id = req.params.id;
            const collection = await Collection.findById(id);

            return res.json(collection)

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async add(req, res){
        try{
            
            const{name, description, theme, userId} = req.body;

            if(name === '' || description === '' || theme === ''){
                return res.status(400).json({message: "Inputs can't be empty!"})
            }

            const collection = new Collection({name, description, theme, items:[], userId});
            await collection.save();
    
            return res.json({message: "Collection succesfully added!"})
             

        }catch(e){
            console.log(e);
        }
    }


    async update(req, res){
        try{
            console.log('Updating...')
            const id = req.params.id;
            const {name, description, theme} = req.body;
            console.log({name, description, theme});
            const collection = await Collection.findById(id);

            name ? collection.name = name : collection.name;
            description ? collection.description = description : collection.description;
            theme ? collection.theme = theme : collection.theme;

            await collection.save();

            return res.json({message: "Collection succesfully updated!"})


        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }


    async addItemToCollection(req, res){
        try{    
            const id = req.params.id;
            const {topic, desc, userId, customField1_bool, customField1_name, customField1_value, customField2_bool,customField2_name, customField2_value, customField3_bool, customField3_name, customField3_value} = req.body
            const date = Date.now();

            const item = new Item({topic, desc, userId, createdDate: date, collectionId: id, customField1_bool, customField1_name, customField1_value, customField2_bool,customField2_name, customField2_value, customField3_bool, customField3_name, customField3_value});
            await item.save();  

            const collection = await Collection.findById(id);
            collection.items.push(item);
            await collection.save();
          
            return res.json({message: "Item succesfully added!"});

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
             
            topic ? item.topic = topic : item.topic
            desc ? item.desc = desc : item.desc
            tags ? item.tags = tags : item.tags

            await item.save();

            const updatedItems = collection.items.filter((item) => item._id !== itemId);
            updatedItems.push(item);
            collection.items = updatedItems;
            collection.save();
            
            return res.json({message: "Item succesfully updated!"})

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

            return res.json({message: "Collection succefully deleted!"});

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }


    async deleteItemFromCollection(req, res){
        try{
            const itemId = req.query.id;
            const id = req.params.id;

            const collection = await Collection.findById(id);

            const updatedItemsInCollection = collection.items.filter((item)=>JSON.stringify(item._id) !== `"${itemId}"`);

            collection.items = updatedItemsInCollection;

            await Item.findByIdAndRemove(itemId);

            await collection.save();

            return res.json({message: "Item succefully deleted!"})

        }catch(e){
            console.log(e);
        }
    }

}

module.exports = new collectionController;