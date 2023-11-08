const Router = require('express');
const tagController = require('../controllers/tagController');
const tagRouter = new Router();

tagRouter.get('/all', tagController.getAllTags);
tagRouter.get('/all/:id', tagController.getAllItems);

module.exports = tagRouter;