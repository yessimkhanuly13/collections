const Router = require('express');
const itemsController = require('../controllers/itemsController');
const itemsRouter = new Router();

itemsRouter.get('/all', itemsController.getAllItems);
itemsRouter.get('/:id', itemsController.getItemsByUserId);
itemsRouter.delete('/delete/:id', itemsController.delete);
itemsRouter.put('/update/:id', itemsController.update);


module.exports = itemsRouter;