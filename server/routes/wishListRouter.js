const express = require('express');
const mongoose = require('mongoose');
const WishList = require('../models/wishListSchema');
const auth = require('../auth');
const cors = require('./cors');

const wishListRouter = express.Router();

wishListRouter.use(express.json());

// /wishList/ endpoint:
wishListRouter.route('/')
.options(cors.corsWithOpts, (req, res) =>{ res.sendStatus(200); })
.get(cors.cors, auth.verifyUser, (req, res, next) =>{
    WishList.findOne({user: req.user._id})
    .populate('wishlist')
    .then((wishlist) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(wishlist ? wishlist.wishlist : wishlist);
    },
    (err) => next(err))
    .catch((err) => next(err))
})
.delete(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{
    WishList.deleteOne({user: req.user._id}, (err, result) =>{
        if (!err){
            // console.log("Document of " + req.user._doc.firstname + " " + req.user._doc.lastname   + " has been removed");
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        }else{
            next(err);
        }
    },
    (err) => next(err))
    .catch((err) => next(err))
})


wishListRouter.route('/:productId')
.options(cors.corsWithOpts, (req, res) =>{ res.sendStatus(200); })
.post(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{
    WishList.findOne({user: req.user._id})
    .then((userList) =>{
        if (userList){
            if (userList.wishlist.indexOf(req.params.productId) == -1){
                // user exist & product does not exist
                userList.wishlist.push(req.params.productId);
                userList.save()
                .then((newWishlist) =>{
                    WishList.findById(newWishlist._id)
                    .populate('wishlist')
                    .then((favorite) =>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({
                            wishlist: favorite.wishlist[favorite.wishlist.length - 1],
                            success: true,
                            statusMsg:'Product added to wishlist'
                        });
                    })
                })    
            }else{
                return res.status(409).send({
                    statusMsg: 'Product already exist'
                 });
            }

        }else{
            // user does not exist
            WishList.create({
                user: req.user._id,
                wishlist: req.params.productId
            })
            .then((newWishlist) =>{
                WishList.findById(newWishlist._id)
                .populate('wishlist')
                .then((favorite) =>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        wishlist: favorite.wishlist,
                        success: true,
                        statusMsg:'Product added to wishlist'
                    });
                })
            })  
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{
    WishList.findOne({user: req.user._id})
    .then((userList) =>{
        if (userList){
            if (userList.wishlist.indexOf(req.params.productId) !== -1){
                if (userList.wishlist.length > 1){
                    userList.update(
                        { $pull: { wishlist: req.params.productId } }
                    )
                    .then(() =>{
                        WishList.findById(userList._id)
                        .populate('wishlist')
                        .then((favorite) =>{
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({
                                wishlist: favorite.wishlist,
                                success: true,
                                statusMsg: 'Product removed from wishlist'
                            });
                        })
                        },
                    (err) => next(err))
    
                }else{
                    WishList.deleteOne({user: req.user._id})
                    .then(result =>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({
                            wishlist: [],
                            success: true,
                            statusMsg: 'Wishlist removed'
                        });
                    },
                    (err) => next(err))
                    .catch((err) => next(err))
                }
            }else{
                return res.status(404).send({
                    statusMsg: 'Product not found'
                });  
            }
        }else{
            return res.status(404).send({
                statusMsg: 'You have no wishlist'
            });
        }
    },
    (err) => next(err))
    .catch((err) => next(err));
})

module.exports = wishListRouter;
