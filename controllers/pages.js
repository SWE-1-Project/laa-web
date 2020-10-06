const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'TAMUSA ACM Homepage' });
});

module.exports = router;

/*
//Throws error: cannot find jsonwebtoken
//Routes controls
//const express = require('express');
//const router = express.Router();
const userController = require('../controllers/userController');
 
router.post('/signup', userController.signup);
 
router.post('/login', userController.login);
 
router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);
 
router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);
 
router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);
 
router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);
 
module.exports = router;
*/