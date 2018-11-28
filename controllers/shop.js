const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const Product = require('../models/product');
const Order = require('../models/order');

// exports.getProducts = (req, res, next) => {
//     Product.fetchAll(products => {
//         res.render('shop/product-list', {
//             prods: products,
//             pageTitle: 'All products',
//             path: '/products'
//           });
//     });    
//   };
// exports.getProducts = (req, res, next) => {
//     Product.fetchAll()
//     .then(([rows, fieldData]) => {
//         res.render('shop/product-list', {
//             prods: rows,
//             pageTitle: 'All products',
//             path: '/products'
//           }); 
//     })
//     .catch(err => console.log(err));       
//   };
// mysql
// exports.getProducts = (req, res, next) => {
//   Product.findAll()
//     .then(products => {
//       res.render("shop/product-list", {
//         prods: products,
//         pageTitle: "All products",
//         path: "/products"
//       });
//     })
//     .catch(err => console.log(err));
// };
// mongodb
// exports.getProducts = (req, res, next) => {
//     Product.fetchAll()
//       .then(products => {
//         res.render("shop/product-list", {
//           prods: products,
//           pageTitle: "All products",
//           path: "/products"
//         });
//       })
//       .catch(err => console.log(err));
//   };
exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            console.log(products);
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "All products",
                path: "/products"
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

// exports.getProduct = (req, res, next) => {
//     const prodId = req.params.productId;
//     Product.findById(prodId, product => {
//         res.render('shop/product-detail', {
//             product: product,
//             pageTitle: product.title,
//             path: '/products'
//         });
//     });
// }  
// exports.getProduct = (req, res, next) => {
//     const prodId = req.params.productId;
//     Product.findById(prodId)
//     .then(([rows, fieldData]) => {
//         res.render('shop/product-detail', {
//             product: rows[0],
//             pageTitle: rows[0].title,
//             path: '/products'
//         });
//     })
//     .catch(err => console.log(err));
// }  
// mongodb
// exports.getProduct = (req, res, next) => {
//     const prodId = req.params.productId;
//     // Product.findAll({where: {id: prodId}})
//     // .then(products => {
//     //     res.render('shop/product-detail', {
//     //         product: products[0],
//     //         pageTitle: products[0].title,
//     //         path: '/products'
//     //     });
//     // })
//     // .catch(err => console.log(err));
//     Product.findById(prodId)
//     .then(product => {
//         res.render('shop/product-detail', {
//             product: product,
//             pageTitle: product.title,
//             path: '/products'
//         });
//     })
//     .catch(err => console.log(err));
// }  
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}  

// exports.getIndex = (req, res, next) => {
//     Product.fetchAll(products => {
//         res.render('shop/index', {
//             prods: products,
//             pageTitle: 'Shop',
//             path: '/'
//         });
//     });
// };
// exports.getIndex = (req, res, next) => {
//     Product.fetchAll()
//     .then(([rows, fieldData]) => {
//         res.render('shop/index', {
//             prods: rows,
//             pageTitle: 'Shop',
//             path: '/'
//         });
//     })
//     .catch(err => console.log(err));    
// };
// mysql
// exports.getIndex = (req, res, next) => {
//     Product.findAll()
//     .then(products => {
//         res.render('shop/index', {
//             prods: products,
//             pageTitle: 'Shop',
//             path: '/'
//         });
//     })
//     .catch(err => console.log(err));
// };
// mongodb
// exports.getIndex = (req, res, next) => {
//     Product.fetchAll()
//     .then(products => {
//         res.render('shop/index', {
//             prods: products,
//             pageTitle: 'Shop',
//             path: '/'
//         });
//     })
//     .catch(err => console.log(err));
// };
exports.getIndex = (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};

// exports.getCart = (req, res, next) => {
//     Cart.getCart(cart => {
//         Product.fetchAll(products => {
//             const cartProducts = [];
//             for (product of products) {
//                 const cartProductData = cart.products.find(p => p.id === product.id);     
//                 if (cartProductData) {
//                     cartProducts.push({productData: product, qty: cartProductData.qty});     
//                 }                                     
//             }
//             res.render('shop/cart', {
//                 path: '/cart',
//                 pageTitle: 'Your cart',
//                 products: cartProducts
//             });    
//         });        
//     });
// };
// mysql
// exports.getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then(cart => {
//       return cart
//         .getProducts()
//         .then(products => {
//           res.render("shop/cart", {
//             path: "/cart",
//             pageTitle: "Your cart",
//             products: products
//           });
//         })
//         .catch(err => console.log(err));
//     })
//     .catch(err => console.log(err));
// };
// mongodb
// exports.getCart = (req, res, next) => {
//     req.user
//         .getCart()
//         .then(products => {
//             res.render("shop/cart", {
//                 path: "/cart",
//                 pageTitle: "Your cart",
//                 products: products
//             });
//         })
//         .catch(err => console.log(err));
// };
exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items;
            res.render("shop/cart", {
                path: "/cart",
                pageTitle: "Your cart",
                products: products
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

// exports.postCart = (req, res, next) => {
//     const prodId = req.body.productId;
//     Product.findById(prodId, product => {
//         Cart.addProduct(prodId, product.price);
//     });    
//     res.redirect('/cart');
// };
// mysql
// exports.postCart = (req, res, next) => {
//     const prodId = req.body.productId;
//     let fetchedCart;
//     let newQuantity = 1;
//     req.user
//     .getCart()
//     .then(cart => {
//         fetchedCart = cart;
//       return cart.getProducts({where: {id: prodId}});
//     })
//     .then(products => {
//         let product;
//         if (products.length > 0) {
//             product = products[0];
//         }        
//         if (product) {
//             const oldQuantity = product.cartItem.quantity;
//             newQuantity = oldQuantity + 1;
//             return product;            
//         }
//         return Product.findById(prodId)        
//     })
//     .then(product => {
//         return fetchedCart.addProduct(product, {through: {quantity: newQuantity}});
//     })
//     .then(() => {
//         res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// };
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
    .then(product => {
        return req.user.addToCart(product);        
    })
    .then(result => {
        console.log(result);
        res.redirect('/cart');
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
    // let fetchedCart;
    // let newQuantity = 1;
    // req.user
    // .getCart()
    // .then(cart => {
    //     fetchedCart = cart;
    //   return cart.getProducts({where: {id: prodId}});
    // })
    // .then(products => {
    //     let product;
    //     if (products.length > 0) {
    //         product = products[0];
    //     }        
    //     if (product) {
    //         const oldQuantity = product.cartItem.quantity;
    //         newQuantity = oldQuantity + 1;
    //         return product;            
    //     }
    //     return Product.findById(prodId)        
    // })
    // .then(product => {
    //     return fetchedCart.addProduct(product, {through: {quantity: newQuantity}});
    // })
    // .then(() => {
    //     res.redirect('/cart');
    // })
    // .catch(err => console.log(err));
};

// exports.postCartDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     Product.findById(prodId, p => {
//         Cart.deleteProduct(prodId, p.price);
//         res.redirect('/cart');
//     });    
// };
// mysql
// exports.postCartDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     req.user.getCart()
//     .then(cart => {
//         return cart.getProducts({where: {id: prodId}});
//     })
//     .then(products => {
//         const product = products[0];
//         return product.cartItem.destroy();
//     })
//     .then(result => {
//         res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// };
// mongodb
// exports.postCartDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     req.user.deleteItemFromCart(prodId)    
//     .then(result => {
//         res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// };
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.removeFromCart(prodId)    
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};

// mongodb
// exports.postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .addOrder()
//     .then(result => {
//       res.redirect("/orders");
//     })
//     .catch(err => console.log(err));
// };
exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {            
            const products = user.cart.items
                .map(i => {
                    return { quantity: i.quantity, product: { ...i.productId._doc } };
                }); 
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user
                },
                products: products
            });  
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();            
        })
        .then(() => res.redirect("/orders"))
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

// exports.getOrders = (req, res, next) => {
//     res.render('shop/orders', {
//         path: '/orders',
//         pageTitle: 'Your order'
//     });
// };
// exports.getOrders = (req, res, next) => {
//     req.user.getOrders({include: ['products']})
//     .then(orders => {
//         res.render('shop/orders', {
//             path: '/orders',
//             pageTitle: 'Your order',
//             orders: orders
//         });
//     })
//     .catch(err => console.log(err));    
// };
// mongodb
// exports.getOrders = (req, res, next) => {
//     req.user.getOrders()
//     .then(orders => {
//         res.render('shop/orders', {
//             path: '/orders',
//             pageTitle: 'Your order',
//             orders: orders
//         });
//     })
//     .catch(err => console.log(err));    
// };
exports.getOrders = (req, res, next) => {
    Order.find({'user.userId': req.user._id})
    .then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your order',
            orders: orders
        });
    })    
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });    
};

// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', {
//         path: '/checkout',
//         pageTitle: 'Checkout'
//     })
// };

exports.getInvoice = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
        .then(order => {
            if (!order) {                
                return next(new Error('No order found'));
            }
            if (order.user.userId.toString() !== req.user._id.toString()) {
                return next(new Error('Unauthorized'));
            }
            const invoiceName = 'invoice-' + orderId + '.pdf';
            const invoicePath = path.join('data', 'invoices', invoiceName);
            const pdfDoc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
            pdfDoc.pipe(fs.createWriteStream(invoicePath));
            pdfDoc.pipe(res);
            pdfDoc.fontSize(26).text('Invoice', {
                underline: true
            });
            pdfDoc.text('----------------------------------');
            let totalPrice = 0;
            order.products.forEach(prod => {
                totalPrice += prod.product.price * prod.quantity;
                pdfDoc.fontSize(14).text(prod.product.title + ' - ' + prod.quantity + ' x ' + '$' + prod.product.price);
            });
            pdfDoc.text('------');
            pdfDoc.fontSize(20).text('Total price: $' + totalPrice);
            pdfDoc.end();
            // fs.readFile(invoicePath, (err, data) => {
            //     if (err) {
            //         return next(err);
            //     }
            //     res.setHeader('Content-Type', 'application/pdf');
            //     res.setHeader('Content-Disposition', 'inline; filename="' + invoiceName + '"');
            //     res.send(data);
            // });
            
        })
        .catch(err => next(err));
};