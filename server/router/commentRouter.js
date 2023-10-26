const Router = require('express');
const commentController = require('../controllers/commentController');
const commentRouter = new Router();

commentRouter.get('/:id', commentController.get);
commentRouter.post('/add', commentController.add);
commentRouter.delete('/delete/:id', commentController.delete);
commentRouter.put('/likedel', commentController.addLike);
commentRouter.put('/likeupd', commentController.deleteLike);


module.exports = commentRouter;