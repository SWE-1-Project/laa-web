const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Pet = require('./api-request');
const mongoose = require('mongoose');

//const connBlogDB = mongoose.connect('mongodb://localhost:27017/BlogDB');

const Post = require('../models/post');
const Event = require('../models/event');
const User = require('../models/user');
const Category = require('../models/category');
const Tag = require('../models/tag');

const Contact = require('../models/contact');
//const Role = require('../role');
//var db = require('../models');

const router = express.Router();

router.get('/', (req, res) => {

    res.render('index', {
        title: 'Lytle Animal Allies Homepage'
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us'
    });
});

router.get('/volunteer', (req, res) => {
    res.render('volunteer', {
        title: 'Volunteer'
    });
});

router.get('/donate', (req, res) => {
    res.render('donate', {
        title: 'Donate'
    });
});

router.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Us'
    });
});

router.get('/event', (req, res) => {
    const dateFormat = require('dateformat');
    const date = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM TT");
    
    Event.find().sort({date: -1}).then(results => {
        res.render('event', 
        {
            events: results,
            date: date,
            title: 'Events'
        });
    })
    .catch(err => console.log(err));
});

router.get('/createEvent', (req, res) => {
    res.render('createEvent', {
        title: 'Create an Event'
    });
    
});

router.post('/submitEvent', (req, res) => {
    // Use schema model
    const dateFormat = require('dateformat');
    const date = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM TT");
    const eDate = dateFormat(new Date(), "dddd, mmmm dS, yyyy");
    const eTime = dateFormat(new Date(), "h:MM TT");
    const event = new Event({
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
        .sort({
            date: -1
        })
        .then(results => {
            res.render('submitEvent', {
                events: results,
                title: 'Submitted Event'
            });
        })
        .catch(err => console.log(err));

});

router.get('/blog', (req, res) => {
    const dateFormat = require('dateformat');
    const date = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM TT");
    
    Post.find().sort({date: -1}).then(results => {
        User.findOne({author: req.body.author}).then(user => {
            Category.findOne({titleCategory: req.body.titleCategory}).then(category => {
                Tag.findOne({titleTag: req.body.titleTag}).then(tag => {
                    res.render('blog',
                    {
                        posts: results,
                        users: user,
                        categories: category,
                        tags: tag,
                        title: 'Blog'
                    });
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })      
    .catch(err => console.log(err));    
});

router.get('/createPost', (req, res) => {
    const title = req.body.title;

    Category.find() 
        .then(results => {
            res.render('createPost', 
                {
                    categories: results,
                    title: 'Blog'
                });
        })
        .catch(err => console.log(err));
});

router.post('/submitPost', (req, res) => {
    // Use schema model
    const dateFormat = require('dateformat');
    const date = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM TT");
    const post = new Post({
        title: req.body.title,
        author: req.body.author,
        date: date,
        mainImage: req.body.mainImage,
        content: req.body.content
    });
    const category = new Category ({
        title: req.body.title
    });
    const tag = new Tag ({
        title: req.body.title
    });
    Post.collection.insertOne(post, category, tag)
        .then(result => {
            console.log('Insertion Success!');
        })
        .catch(err => console.log(err));
    Post.find()
        .sort({
            date: -1
        })
        .then(results => {
            res.render('blog', {
                posts: results,
                title: 'Submitted blog'
            });
        })
        .catch(err => console.log(err));

});

router.get('/createCategory', (req, res) => {
    const title = req.body.title;

    Category.find() 
        .then(results => {
            res.render('createCategory', 
                {
                    categories: results,
                    title: 'Create Category'
                });
        })
        .catch(err => console.log(err));
});

router.post('/submitCategory', (req, res) => {
    // Use schema model
    const category = new Category({
        title: req.body.title,
        slug: req.body.slug,
        description: req.body.description
    });
    Category.collection.insertOne(category)
        .then(result => {
            console.log('Insertion Success!');
        })
        .catch(err => console.log(err));
    Category.find()
        .then(results => {
            res.render('submitCategory', {
                categories: results,
                title: 'Submitted Category'
            });
        })
        .catch(err => console.log(err));

});



router.get('/adopt', (req, res) => {
    res.render('adopt', {
        title: 'Adoptions'
    });
});

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register'
    });
});




router.post('/add-register', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const city = req.body.city;
    const state = req.body.state;
    const zipCode = req.body.zipCode;
    const email = req.body.email;
    const password = req.body.password;
    var user = {
        firstName,
        lastName,
        address: {
            address1,
            address2,
            city,
            state,
            zipCode
        },
        email,
        password
    }
    User.findOne({
        email: req.body.email
    }, function (err, doc) {
        if (err) {
            console.log(err);
        }
        if (doc == null) {
            User.collection.insertOne(user);
            res.render('/', {
                title: 'Lytle Animal Allies'
            });
        } else {
            res.render('register', {
                title: 'Register',
                message: 'That email address is already registered.'
            });
        }
    });

    router.post('/check-signIn', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({
            email: req.body.email
        }, function (err, doc) {
            if (err) {
                console.log(err);
            }
            if (doc == null) {
                res.render('register', {
                    title: 'Register',
                    message: 'Please register for an account.'
                });
            } else {
                User.findOne({
                    email: req.body.email
                }, function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('/', {
                            user: doc,
                            title: 'Lytle Animal Allies Homepage',
                        });

                    }
                });
            }
        });
    });

    


    router.post('/register', userController.signup);

    router.post('/login', userController.login);

    router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);

    router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);

    router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

    router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);





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