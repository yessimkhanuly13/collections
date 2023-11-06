const Router = require('express');
const itemsController = require('../controllers/itemsController');
const itemsRouter = new Router();

itemsRouter.get('/all', itemsController.getAllItems);
itemsRouter.get('/user/:id', itemsController.getItemsByUserId);
itemsRouter.get('/:id', itemsController.getItemById);
itemsRouter.delete('/delete/:id', itemsController.deleteFromCollection, itemsController.delete);
itemsRouter.put('/update/:id', itemsController.update);


module.exports = itemsRouter;