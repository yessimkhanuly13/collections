const Comment = require('../models/Comment')

class commentController{
    async get(req, res){
        try{
            const itemId = req.params.id;
            const comments = await Comment.find({itemId: itemId});
        
            res.json(comments);
            
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async add(req, res){
        try{
            const {userId, text, itemId} = req.body
            const comment = new Comment({userId, text, createdDate: Date.now(), likes: [], itemId});

            await comment.save();
            res.json({message: "New comment succefully created!"})
        }
        catch(e){
            console.log(e);
            res.json({message: 'Something went wrong!'})
        }
    }

    async addLike(req, res){
        try{
            const {id, userId} = req.body;
            const comment = await Comment.findById(id);
                
            comment.likes.push(userId);
            await comment.save();
            
            res.json({message: "Comment succefully liked!"})
    
        }
        catch(e){
            console.log(e);
            res.json({message: 'Something went wrong!'})
        }
    }

    async delete(req, res){
        try{
            const id = req.params.id;

            await Comment.findByIdAndRemove(id);

            res.json({message: "Comment is deleted succesfully!"});
        }
        catch(e){
            console.log(e);
            res.json({message: 'Something went wrong!'})
        }
    }

    async deleteLike(req, res){
        try{
            const {id, userId} = req.body;

            const comment = await Comment.findById(id);
            const updatedLikes = comment.likes.filter((likeId)=> likeId !== userId);

            comment.likes = updatedLikes;
            await comment.save();

            res.json({message: "Comment succesfully unliked!"})
        }
        catch(e){
            console.log(e);
            res.json({message: 'Something went wrong!'})
        }
    }
   
}

module.exports = new commentController;