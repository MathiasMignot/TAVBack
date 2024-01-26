const express = require ('express');
const usersController =require ('../../controllers/usersController.js');

const auth = require ('./../../authentification.js')

const router = express.Router();

router.post('/login', usersController.login);

router.get('/logout', auth, usersController.logout);


module.exports = router ;