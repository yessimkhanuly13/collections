const Router = require('express');
const itemsController = require('../controllers/itemsController');
const itemsRouter = new Router();

itemsRouter.get('/:id', itemsController.get);
itemsRouter.post('/add', itemsController.add);
itemsRouter.delete('/delete/:id', itemsController.delete);
itemsRouter.put('/update/:id', itemsController.update);


module.exports = itemsRouter;