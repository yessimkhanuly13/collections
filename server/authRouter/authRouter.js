const Router = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = new Router();


router.post('/auth/login', authController.login);
router.post('/auth/registration', authController.registration)


router.get('/users', userController.getUsers);
router.post('/users/delete', userController.deleteUsers);
router.post('/users/block', userController.blockUsers);

module.exports = router;