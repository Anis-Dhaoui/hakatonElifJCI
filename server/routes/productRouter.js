const express = require('express');
const Products = require('../models/productSchema');
const mongoose = require('mongoose');
const auth = require('../auth');
const cors = require('./cors');

const productRouter = express.Router();
productRouter.use(express.json());

// /products/
productRouter.route('/')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) =>{
    Products.find({})
    .then((products) =>{
        if (products !== null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(products);
        }else{
            err = new Error("Products collection is empty or not found");
            next(err);
        }
    },
    err => next(err))
    .catch(err => next(err))
})
.post(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{

    req.body.user = req.user._id;
    Products.create(req.body)
    .then((product) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({product: product, success: true, statusMsg: "Product posted successfully"});
    },
    err => {
        // if err.code === 11000 that means there is a duplicate key
        if(err.code && err.code === 11000){
            res.statusCode = 409;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, statusMsg: "Product name is already exist"});
        }else
        next(err);
    })
    .catch(err => next(err));
})


// /products/:productId/
productRouter.route('/:productId')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) =>{
    Products.findById(req.params.productId)
    .then((product) =>{
        if (product != null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(product);
        }else{
            err = new Error("Product not found");
            next(err);
        }
    },
    err => next(err))
    .catch(err => next(err))
})

.put(cors.corsWithOpts, auth.verifyUser, auth.verifyOwner, (req, res, next) =>{
    Products.findByIdAndUpdate(req.params.productId, {$set: req.body}, {new: true})
    .then(() =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, statusMsg: "Product updated successfully"});
    },
    err => next(err))
    .catch(err => next(err))
})
.delete(cors.corsWithOpts, auth.verifyUser, auth.verifyOwner, (req, res, next) =>{
    Products.findByIdAndRemove(req.params.productId)
    .then(() =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');7
        res.json({success: true, statusMsg: "Product deleted successfully"});
    },
    err => next(err))
    .catch(err => next(err))
});

module.exports = productRouter;