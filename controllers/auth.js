User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
    User.findById('5bf8875e378c651fd7559806')
    .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save((err) => {
            console.log(err);
            res.redirect('/');    
        }); 
    })
    .catch(err => console.log(err));    
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });    
};