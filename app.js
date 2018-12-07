const path = require('path');
const fs = require('fs');

const express = require("express");

const adminRoutes = require("./routes/admin");
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');
const shopController = require('./controllers/shop');
const isAuth = require('./middleware/is-auth');
// const db = require('./util/database');
// const sequelize = require('./util/database');
// const Product = require('./models/product');
// const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');

const bodyParser = require("body-parser");
// const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const MOGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-8uuhu.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

const app = express();
const store = new MongoDBStore({
    uri: MOGODB_URI,
    collection: 'sessions'
});
const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }    
};

// app.engine('hbs', expressHbs({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs'
// }));
// app.set('view engine', 'hbs');
app.set('view engine', 'ejs');

// app.set('view engine', 'pug');
app.set('views', 'views');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags: 'a'
});

app.use(helmet());
app.use(compression());
app.use(morgan('combined', {
    stream: accessLogStream
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});

app.use((req, res, next) => {
    // throw new Error('Sync dummy');
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        if (!user) {
            return next();
        }
        req.user = user;
        next();    
    })
    .catch(err => {
        next(new Error(err));
    });    
});

app.post('/create-order', isAuth, shopController.postOrder);
app.use(csrfProtection);
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

// mysql inicio
// Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, {through: CartItem});
// Product.belongsToMany(Cart, {through: CartItem});
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, {through: OrderItem});

// // sequelize.sync({force: true})
// sequelize.sync()
// .then(result => {
//     return User.findById(1);    
// })
// .then(user => {
//     if (!user) {
//         return User.create({name: 'Pepo', email: 'pepo@test.com'});
//     }
//     return user;
// })
// .then(user => {
//     // console.log(user);
//     return user.createCart();    
// })
// .then(cart => {
//     app.listen(3000);
// })
// .catch(err => console.log(err));
// mysql fin


// const server = http.createServer(app);

// server.listen(3000);
// app.listen(3000);

// mongoConnect(() => {   
//     app.listen(3000);
// });

app.use((error, req, res, next) => {
    // res.status(error.httpStatusCode).render(...);
    // res.redirect('/500');
    res.status(500).render('500', {
        pageTitle: 'Error', 
        path: '/500',
        isAuthenticated: req.session.isLoggedIn
    });
});

mongoose
.connect(MOGODB_URI)
.then(result => {
    app.listen(process.env.PORT || 3000);
})
.catch(err => console.log(err));
