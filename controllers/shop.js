const Product = require('../models/product');
const Cart = require('../models/cart');


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
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All products",
        path: "/products"
      });
    })
    .catch(err => console.log(err));
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
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // Product.findAll({where: {id: prodId}})
    // .then(products => {
    //     res.render('shop/product-detail', {
    //         product: products[0],
    //         pageTitle: products[0].title,
    //         path: '/products'
    //     });
    // })
    // .catch(err => console.log(err));
    Product.findById(prodId)
    .then(product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    })
    .catch(err => console.log(err));
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
exports.getIndex = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    })
    .catch(err => console.log(err));
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
exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your cart",
            products: products
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });    
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, p => {
        Cart.deleteProduct(prodId, p.price);
        res.redirect('/cart');
    });    
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your order'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
};