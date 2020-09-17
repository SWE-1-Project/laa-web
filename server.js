const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pagesRouter = require('./controllers/pages');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', pagesRouter);

mongoose.connect('mongodb://localhost:27017/BlogDB', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(3000, () => {
            console.log('MongoDB connected. Express server is running')
    });
})