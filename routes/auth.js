const express = require('express');
const { body } = require('express-validator'); 

const User = require('../models/user')// we take the user to use it here
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup',[
    body('email').isEmail().withMessage('please enter a valid email')
    .custom((value, {req}) =>{
        return User.findOne({email: value}).then(userDoc =>{//email refer to the email in db and value for email i input
            if(userDoc){
                return Promise.reject('email address is already exist.');
            }
        });
    })
    .normalizeEmail(),
    body('password')
    .trim()
    .isLength({min :5}),
    body('name')
    .trim()
    .not()
    .isEmpty()
],
    authController.signup);//here we use validation using array

    router.post('/login', authController.login);

    module.exports = router