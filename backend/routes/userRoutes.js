const express = require('express');
const userController = require('../controllers/userController');

const router = new express.Router();

router.route('/').get(userController.authorize,userController.loggedIn,userController.getMe).post(userController.signIn);
router.post('/sign-up',userController.signUp);
router.route('/logout').get(userController.logOut);
router.post('/forgot-password', userController.forgotPassword);
router.post('/password-reset/:email/:token', userController.passwordReset);

module.exports = router;