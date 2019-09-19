//Sam Pink

const mongose = require('mongoose');
const bcrypr = require('bcryptjs');

//const config = require('../config/database');

//user schema
const userSchema = mongose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const User = module.exports = mongose.model('User', userSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByUserName = function (userName, callback) {
    const query = {
        userName: userName
    };
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
    bcrypr.genSalt(10, (err, salt) => {
        bcrypr.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};