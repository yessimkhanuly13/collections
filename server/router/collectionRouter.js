const Router = require('express');
const collectionController = require('../controllers/collectionController');
const collectionRouter = new Router();


collectionRouter.get('/all', collectionController.getAllCollections);
collectionRouter.get('/user/:id', collectionController.getCollectionsByUserId);
collectionRouter.get('/:id', collectionController.getCollectionById)
collectionRouter.post('/add', collectionController.add);
collectionRouter.put('/update/:id', collectionController.update);
collectionRouter.delete('/delete/:id',collectionController.deleteItems, collectionController.delete );
collectionRouter.put('/additem/:id', collectionController.addItemToCollection);
collectionRouter.put('/updateitem/:id', collectionController.updateItemInCollection);


module.exports = collectionRouter;