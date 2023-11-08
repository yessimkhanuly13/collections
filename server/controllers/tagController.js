const Item = require("../models/Item");
const Tag = require("../models/Tag");

class tagController{
    async getAllTags(req, res){
        try{
            const tags = await Tag.find();
            return res.json(tags);

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async getAllItems(req, res){
        try{
            const id = req.params.id;
            const items = await Item.find();
            const tag = await Tag.findById(id);
            console.log(items);
            const itemsWithTag = items.filter((item)=> item.tags && item.tags.includes(tag._id));
            console.log(itemsWithTag);
            console.log(itemsWithTag);

            return res.json(itemsWithTag);
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }   
}

module.exports = new tagController;