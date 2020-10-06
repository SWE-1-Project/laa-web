//User authorization


const {roles} = require('../models/roles')

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/*
hashpassword encrypts the password
*/
async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

/* 
compares user input password to User.password using saved encrypted password
*/
async function validatePassword (plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

//Signup controls for creating new user
exports.signup = async (req, res, next) => {
    try {
        //req.body obtains consts from a form
        const {email, password, role} = req.body
        //hashedPassword is password from form hashed
        const hashedPassword = await hashPassword (password);
        //Creates user from User object
        const newUser = new User ({email, password: hashedPassword, role: role || "basic"});
        //Creates key to represent user accessing JSON data
        const accessToken = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        //User object's accessToken set to newly created token
        newUser.accessToken = accessToken;
        await newUser.save();
        res.json({
            data: newUser,
            accessToken
        })
    } catch (error) {
        next(error)
    }
}

//Async runs in background/at the same time;
//Login controls for current users to log
exports.login = async (req, res, next) => {
    try {
        //Obtained from login form
        const {email, password} = req.body;
        //Assumedly waits for user to input email
        const user = await User.findOne({email});
        if (!user) return next(new Error('Email does not exist'));
        //Compares entered password in form to hashed password created by new user account
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(new Error('Incorrect password'))
        //Creates new acceess token (cookies?) to refresh user access
        const accessToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        //Updates user token (for authetication)
        await User.findByIdAndUpdate(user._id, {accessToken})
        res.status(200).json({
            data: {email: user.email, role: user.role},
            accessToken
        })
    } catch (error) {
        next(error);
    }
}

//Gets all users
exports.getUsers = async (req, res, next) => {
    //Unceratin; waits for user to...?
    const users = await User.find({})
    //Resource...?
    res.status(200).json({
        data: users
    });
}

//Gets single user based on userId
exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        //Confirms user exists by userId
        const user = await User.findById(userId);
        if (!user) return next(new Error('User does not exist'));
        res.status(200).json({
            data: user
        });
    } catch (error) {
        next(error)
    }
}

//Updates user based on form
exports.updateUser = async (req, res, next) => {
    try {
        const update = req.body
        //Where does userId come from...?
        const userId = req.params.userId;
        await User.findByIdAndUpdate(userId, update);
        //Gets current user and allows changes from update form
        const user = await User.findById(userId)
        res.status(200).json({
            data: user,
        message: 'User has been updated'
        });
    } catch (error) {
        next(error)
    }
}

//D E S T R O Y
exports.deleteUser = async (req, res, next) => {
    try {
        //Req is some input, which forces need for userId from User model
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            data: null,
            message: 'User has been deleted'
        });
    } catch (error) {
        next(error)
    }
}

//Requires const {roles}

//Users with certain roles can access specified paths
exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try {
            //Role permissions
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next()
        } catch (error) {
            next(error)
        }
    }   
}
    
//Grants access only if user is designated as logged in
exports.allowIfLoggedin = async (req, res, next) => {
    try {
        //What is res...?
        const user = res.locals.loggedInUser;
        if (!user)
            return res.status(401).json({
                error: "You need to be logged in to access this route"
            });
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}