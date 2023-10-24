const Router = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = new Router();


router.post('/login', authController.login);
router.post('registration', authController.registration)


router.get('/getusers', userController.getUsers);
router.post('/delusers', userController.deleteUsers);
router.post('/blockusers', userController.blockUsers);

module.exports = router;