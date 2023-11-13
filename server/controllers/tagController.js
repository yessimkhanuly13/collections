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

            const itemsWithTag = [];

            items.forEach((item) => {
                const itemTagIds = item.tags.map((itemTag) => itemTag.value);
                if (itemTagIds.includes(tag.value)) {
                    itemsWithTag.push(item);
                }
            })

            return res.json(itemsWithTag);
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }   
}

module.exports = new tagController;