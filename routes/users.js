const express = require('express');
const router = express.Router();
const passport = require('passport-jwt');
const jwt = require('jsonwebtoken');


const User = require('../models/user');

//Create new user
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                mesg: 'Failed to  create user'
            });
        } else {
            res.json({
                success: true,
                msg: 'User created'
            });
        }
    });
});

//Get user email by searching name
router.get('/getUser/:name', (req, res) => {
    User.getUserByUserName(req.params.name, (err, data) => {
        if (err) {
            res.json({
                success: false,
                mesg: 'Failed to  create user'
            });
        } else {
            res.json({
                success: true,
                user: data.email
            });
        }
    });
});

//Get all users
router.get('/getUsers', (req, res) => {
    User.getUsers((err, data) => {
        if (err) {
            res.send('Error');
        } else {
            res.json(data);
        }
    });
});



module.exports = router;