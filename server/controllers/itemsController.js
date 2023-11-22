const Collection = require('../models/Collection');
const Item = require('../models/Item');
const Tag = require('../models/Tag');
const Comment = require('../models/Comment')

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
            const existTag = await Tag.find({value:`#${tag}`});
            
            let reqTag;

            if(!existTag.length){
                const newTag = new Tag({value: `#${tag}`});
                await newTag.save();
                reqTag = newTag;
            }else{
                reqTag = existTag[0];
            }

            req.tag = reqTag;

            next();

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }


    async addTagToItem(req, res){
        try{
            const {tag} = req;
            const id = req.params.id;
            const updatedItem = await Item.findById(id);

            updatedItem.tags.push(tag);
            
            await updatedItem.save();

            return res.json({message: "Tag succesfully added!"})
          
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async addNewComment(req, res, next){
        try{
            const {username, value, userId} = req.body
            const comment = new Comment({username, value, createdDate: Date.now(), userId});
            await comment.save();

            req.comment = comment;
            console.log(comment);
            next();
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async addCommentToItem(req, res){
        try{   
            const id = req.params.id;
            const item = await Item.findById(id);
            console.log(item);
            console.log(req.comment);
            const comment = req.comment;
            item.comments.push(comment);
            await item.save();

            res.json({message: "Comment succesfully added!"})

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async commentLikeHandle(req, res){
        try{
            const commentId = req.query.commentId;
            const username = req.params.username;
            const id = req.params.id;
            
            const comment = await Comment.findById(commentId);

            if( comment.likes.includes(username)){
                comment.likes.filter((user)=>user !== username);
            }else{
                comment.likes.push(username);
            }
            
            await comment.save();

            const item = await Item.findById(id);

            const comments = item.comments.filter((itemComment)=>JSON.stringify(itemComment._id) !== JSON.stringify(comment._id));
            comments.push(comment);
  
            item.comments = comments;
            await item.save();

            return res.json({message: "Like successfully added!"})
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async deleteCommentFromItem(req, res){
        try{
            const commentId = req.query.commentid;
            const id = req.params.id;
            const comment = await Comment.findById(commentId); 

            await Comment.findByIdAndRemove(commentId);

            const item  = await Item.findById(id);

            const updatedComments = item.comments.filter((itemComment)=> itemComment._id !== comment._id )

            item.comments = updatedComments;

            await item.save();


        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }
}

module.exports = new itemsController;