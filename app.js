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
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

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

app.use((req, res, next) => {
    // mysql
    // User.findById(1)
    // .then(user => {
    //     req.user = user;
    //     next();
    // })
    // .catch(err => console.log(err));
    User.findById('5bf8875e378c651fd7559806')
    .then(user => {
        // mongodb
        // req.user = new User(user.name, user.email, user.cart, user._id);
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
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
.connect('mongodb+srv://pepo:pepo@cluster0-8uuhu.mongodb.net/shop?retryWrites=true')
.then(result => {
    User.findOne()
    .then(user => {
        if (!user) {
            const user = new User({
                name: 'Pepo',
                email: 'pepo@test.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    });
    app.listen(3000);
})
.catch(err => console.log(err));
