const Router = require('express');
const userController = require('../controllers/userController');
const userRouter = new Router();

userRouter.get('/:id', userController.getUser);
userRouter.delete('/delete/:id', userController.deleteUser);
userRouter.put('/block/:id', userController.blockUser);
userRouter.put('/unblock/:id', userController.unblockUser);
userRouter.put('/admin/:id', userController.getAdmin);
userRouter.put('/user/:id', userController.removeAdmin);

module.exports = userRouter;