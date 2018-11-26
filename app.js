const path = require('path');

const express = require("express");

const adminRoutes = require("./routes/admin");
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');
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

const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const MOGODB_URI = 'mongodb+srv://pepo:pepo@cluster0-8uuhu.mongodb.net/shop';

const app = express();
const store = new MongoDBStore({
    uri: MOGODB_URI,
    collection: 'sessions'
});
const csrfProtection = csrf();

// app.engine('hbs', expressHbs({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs'
// }));
// app.set('view engine', 'hbs');
app.set('view engine', 'ejs');

// app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        next();    
    })
    .catch(err => console.log(err));    
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

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

mongoose
.connect(MOGODB_URI)
.then(result => {
    app.listen(3000);
})
.catch(err => console.log(err));
