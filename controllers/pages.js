const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
//const userController = require('../controllers/userController');
const { userInfo } = require('os');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'Lytle Animal Allies Homepage' });
});

router.get('/about', (req, res) => {
    res.render('about', {title: 'About Us' });
});

router.get('/events', (req, res) => {
    const dateFormat = require('dateformat');
    const date = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM TT");
    const eDate = dateFormat(new Date(), "dddd, mmmm dS, yyyy");
    const eTime = dateFormat(new Date(), "h:MM TT");
    const event = new Event ({
        title: req.body.title,
        author: req.body.author,
        date: date,
        eventDate: eDate,
        eventTime: eTime,
        category: req.body.category,
        tags: req.body.tags,
        mainImage: req.body.mainImage,
        content: req.body.content
    });
    Event.find()
    .sort({eDate: - 1})
    .then(results => {
        res.render('events', {events: results, title: 'Events'});
    })
    .catch(err => console.log(err));
});

router.get('/createEvent', (req, res) => {
    res.render('createEvent', {title: 'Create an Event' });
});

router.post('/submitEvent', (req, res) => {
    // Use schema model
    const dateFormat = require('dateformat');
    const date = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM TT");
    const eDate = dateFormat(new Date(), "dddd, mmmm dS, yyyy");
    const eTime = dateFormat(new Date(), "h:MM TT");
    const event = new Event ({
        title: req.body.title,
        author: req.body.author,
        date: date,
        eventDate: eDate,
        eventTime: eTime,
        category: req.body.category,
        tags: req.body.tags,
        mainImage: req.body.mainImage,
        content: req.body.content
    });
    Event.collection.insertOne(event)
        .then(result => {
            console.log('Insertion Success!'); 
        })
        .catch(err => console.log(err));
    Event.find()
        .sort({date: -1})
        .then(results => {
            res.render('submitEvent', {events: results, title: 'Submitted Event'});
        })
        .catch(err => console.log(err));

});

router.get('/blog', (req, res) => {
    const dateFormat = require('dateformat');
    const date = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM TT");
    const post = new Post ({
        title: req.body.title,
        author: req.body.author,
        date: date,
        category: req.body.category,
        tags: req.body.tags,
        mainImage: req.body.mainImage,
        content: req.body.content
    });
    Post.find()
    .sort({date: - 1})
    .then(results => {
        res.render('blog', {posts: results, title: 'Blog'});
    })
    .catch(err => console.log(err));
 
});

router.get('/createPost', (req, res) => {
    res.render('createPost', {title: 'Create a Post' });
});

router.post('/submitPost', (req, res) => {
    // Use schema model
    const dateFormat = require('dateformat');
    const date = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM TT");
    const post = new Post ({
        title: req.body.title,
        author: req.body.author,
        date: date,
        category: req.body.category,
        tags: req.body.tags,
        mainImage: req.body.mainImage,
        content: req.body.content
    });
    Post.collection.insertOne(post)
        .then(result => {
            console.log('Insertion Success!'); 
        })
        .catch(err => console.log(err));
    Post.find()
        .sort({date: -1})
        .then(results => {
            res.render('submitPost', {posts: results, title: 'Submitted Post'});
        })
        .catch(err => console.log(err));

});

router.get('/adoption', (req, res) => {
    


    res.render('adoption', {title: 'Adopt' });
});

module.exports = router;

/* 
router.post('/signup', userController.signup);
 
router.post('/login', userController.login);
 
router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);
 
router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);
 
router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);
 
router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);
*/