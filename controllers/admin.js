const mongodb = require('mongodb');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator/check');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {  
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      hasError: false,
      errorMessage: null,
      validationErrors: []
    });
};

// exports.postAddProduct = (req, res, next) => {
//     const title = req.body.title;
//     const imageUrl = req.body.imageUrl;
//     const price = req.body.price;
//     const description = req.body.description;
//     const product = new Product(null, title, imageUrl, description, price);
//     product.save();
//     res.redirect("/");
// };
// exports.postAddProduct = (req, res, next) => {
//     const title = req.body.title;
//     const imageUrl = req.body.imageUrl;
//     const price = req.body.price;
//     const description = req.body.description;
//     const product = new Product(null, title, imageUrl, description, price);
//     product.save()
//     .then(() => res.redirect("/"))
//     .catch(err => console.log(err));    
// };
// mysql
// exports.postAddProduct = (req, res, next) => {
//     const title = req.body.title;
//     const imageUrl = req.body.imageUrl;
//     const price = req.body.price;
//     const description = req.body.description;
//     req.user.createProduct({
//         title: title,
//         price: price,
//         imageUrl: imageUrl,
//         description: description
//     })
//     .then(result => {
//         console.log('Created product');
//         res.redirect('/admin/products');
//     })
//     .catch(err => console.log(err));    
// };

// mongodb
// exports.postAddProduct = (req, res, next) => {
//     const title = req.body.title;
//     const imageUrl = req.body.imageUrl;
//     const price = req.body.price;
//     const description = req.body.description;
//     const product = new Product(title, price, description, imageUrl, null, req.user._id);
//     product.save()
//     .then(result => {
//         console.log('Created product');
//         res.redirect('/admin/products');
//     })
//     .catch(err => console.log(err));    
// };
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false,
            hasError: true,
            product: {
                title: title,
                imageUrl: imageUrl,
                price: price,
                description: description
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }
    const product = new Product({
        // _id: mongoose.Types.ObjectId('5bfd02a57ebe953f72d59686'),
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
        userId: req.user
    });
    product.save()
    .then(result => {
        console.log('Created product');
        res.redirect('/admin/products');
    })
    .catch(err => {
        // return res.status(500).render('admin/edit-product', {
        //     pageTitle: 'Add Product',
        //     path: '/admin/add-product',
        //     editing: false,
        //     hasError: true,
        //     product: {
        //         title: title,
        //         imageUrl: imageUrl,
        //         price: price,
        //         description: description
        //     },
        //     errorMessage: 'Database operation failed, please try again',
        //     validationErrors: []
        // });
        // res.redirect('/500');
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });    
};

// exports.getEditProduct = (req, res, next) => {  
//     const editMode = req.query.edit;
//     if (!editMode) {
//         return res.redirect('/');
//     }
//     const prodId = req.params.productId;
//     Product.findById(prodId, product => {
//         if (!product) {
//             return res.redirect('/');
//         }
//         res.render('admin/edit-product', {
//             pageTitle: 'Edit Product',
//             path: '/admin/edit-product',
//             editing: editMode,
//             product: product
//           });
//     });
    
// };
// mysql
// exports.getEditProduct = (req, res, next) => {
//     const editMode = req.query.edit;
//     if (!editMode) {
//         return res.redirect('/');
//     }
//     const prodId = req.params.productId;
//     req.user.getProducts({where: {id: prodId}})
//     // Product.findById(prodId)
//         .then(products => {
//             const product = products[0];
//             if (!product) {
//                 return res.redirect('/');
//             }
//             res.render('admin/edit-product', {
//                 pageTitle: 'Edit Product',
//                 path: '/admin/edit-product',
//                 editing: editMode,
//                 product: product
//             });
//         })
//         .catch(err => console.log(err));
// };
// mongodb
// exports.getEditProduct = (req, res, next) => {
//     const editMode = req.query.edit;
//     if (!editMode) {
//         return res.redirect('/');
//     }
//     const prodId = req.params.productId;
//     Product.findById(prodId)
//         .then(product => {
//             if (!product) {
//                 return res.redirect('/');
//             }
//             res.render('admin/edit-product', {
//                 pageTitle: 'Edit Product',
//                 path: '/admin/edit-product',
//                 editing: editMode,
//                 product: product
//             });
//         })
//         .catch(err => console.log(err));
// };
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product,
                hasError: false,
                errorMessage: null,
                validationErrors: []
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

// exports.getProducts = (req, res, next) => {
//     Product.fetchAll(products => {
//         res.render('admin/products', {
//             prods: products,
//             pageTitle: 'Admin products',
//             path: '/admin/products'
//         });
//     });
// };
// exports.getProducts = (req, res, next) => {
//     Product.fetchAll()
//     .then(([rows, fieldData]) => {
//         res.render('admin/products', {
//             prods: rows,
//             pageTitle: 'Admin products',
//             path: '/admin/products'
//         });
//     })
//     .catch(err => console.log(err));    
// };
// mysql
// exports.getProducts = (req, res, next) => {
//     req.user.getProducts()
//     .then(products => {
//         res.render('admin/products', {
//             prods: products,
//             pageTitle: 'Admin products',
//             path: '/admin/products'
//         });
//     })
//     .catch(err => console.log(err));    
// };
// mongodb
// exports.getProducts = (req, res, next) => {
//     Product.fetchAll()
//     .then(products => {
//         res.render('admin/products', {
//             prods: products,
//             pageTitle: 'Admin products',
//             path: '/admin/products'
//         });
//     })
//     .catch(err => console.log(err));    
// };
exports.getProducts = (req, res, next) => {
    Product.find({
        userId: req.user._id
    })
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
        console.log(products);
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products'
        });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });    
};

// exports.postEditProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     const updatedTitle = req.body.title;
//     const updatedPrice = req.body.price;
//     const updatedImageUrl = req.body.imageUrl;
//     const updatedDescription = req.body.description;
//     const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
//     updatedProduct.save();
//     res.redirect('/admin/products');
// };
// mongodb
// exports.postEditProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     const updatedTitle = req.body.title;
//     const updatedPrice = req.body.price;
//     const updatedImageUrl = req.body.imageUrl;
//     const updatedDescription = req.body.description;
//     const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImageUrl, prodId);
//     product.save()
//     .then(result => {
//         console.log('Updated product');
//         res.redirect('/admin/products');
//     })
//     .catch(err => console.log(err));
// };
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: true,
            hasError: true,
            product: {
                title: updatedTitle,
                imageUrl: updatedImageUrl,
                price: updatedPrice,
                description: updatedDescription,
                _id: prodId
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }
    Product.findById(prodId)
    .then(product => {
        if (product.userId.toString() !== req.user._id.toString()) {
            return res.redirect('/');
        }
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDescription;
        return product.save()
        .then(result => {
            console.log('Updated product');
            res.redirect('/admin/products');
        });
    })    
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};


// exports.postDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     Product.deleteById(prodId);
//     res.redirect('/admin/products');
// };
// mysql
// exports.postDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     Product.findById(prodId)
//     .then(product => {
//         return product.destroy();
//     })
//     .then(result => {
//         console.log('Destroyed product');
//         res.redirect('/admin/products');
//     })
//     .catch(err => console.log(err));    
// };
// mongodb
// exports.postDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     Product.deleteById(prodId)
//     .then(() => {
//         console.log('Destroyed product');
//         res.redirect('/admin/products');
//     })
//     .catch(err => console.log(err));    
// };
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteOne({
        _id: prodId,
        userId: req.user._id
    })
    .then(() => {
        console.log('Destroyed product');
        res.redirect('/admin/products');
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });    
};