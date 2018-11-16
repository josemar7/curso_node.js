const path = require('path');

const express = require("express");

const router = express.Router();

const users = [];

router.get('/', (req, res, next) => {
    res.render('root', {
        pageTitle: 'Root'
    });
});

router.get('/users', (req, res, next) => {
    res.render('users', {
        pageTitle: 'Users',
        users: users
    });
});

router.post('/add-user', (req, res, next) => {
    users.push({name: req.body.user});
    res.redirect("/users");  
});

module.exports = router;