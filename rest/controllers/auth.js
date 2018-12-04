const User = require('../models/user');
const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            password: hashedPassword,
            name: name
        });
        const result = await user.save();
        res.status(201)
            .json({
                message: 'User created',
                userId: result._id
            });
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
        const user = await User.findOne({
            email: email
        });
        if (!user) {
            const error = new Error('A user with this email could not be found');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        }, 'somesupersecretsecret', {
            expiresIn: '1h'
        });
        res.status(200).json({
            token: token,
            userId: loadedUser._id.toString()
        });    
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('Could not find the user');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'User fetched',
            user: user
        });    
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    const userId = req.params.userId;
    const status = req.body.status;
    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('Could not find the user');
            error.statusCode = 404;
            throw error;
        }
        user.status = status;
        const result = await user.save();
        res.status(200).json({
            message: 'User updated',
            user: result
        });    
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
