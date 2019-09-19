const express = require('express');
const router = express.Router();
const passport = require('passport-jwt');
const jwt = require('jsonwebtoken');


const User = require('../models/user');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name : req.body.name,
        email : req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success: false, mesg: 'Failed to  create user'});
        } else{
            res.json({success: true, msg: 'User created'});
        }
    });
});

router.get('/authenticate', (req, res, next) => {
    res.send('authenticate');
});

router.get('/profile', (req, res, next) => {
    res.send('profile');
});

router.get('/validate', (req, res, next) => {
    res.send('validate');
});


module.exports = router;