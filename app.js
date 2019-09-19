const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport-jwt');
const mongoose = require('mongoose');

const mongoCon = 'mongodb+srv://sam:4vXCVrR99Ctz37ec@cluster-iualb.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoCon, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to database');
});

mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Hi');
});

app.listen(port, () => {
    console.log('Starting Server on port ' + port);
});