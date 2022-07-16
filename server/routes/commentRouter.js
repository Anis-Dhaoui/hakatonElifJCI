const express = require('express');
const Comments = require('../models/commentSchema');
const mongoose = require('mongoose');
const auth = require('../auth');
const cors = require('./cors');

const commentRouter = express.Router();
commentRouter.use(express.json());

// /comments
commentRouter.route('/')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) =>{
    Comments.find({})
    .populate('user')
    .then((comments) =>{
        if (comments !== null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(comments);
        }else{
            err = new Error("Product not found");
            next(err);
        }
    },
    err => next(err))
    .catch(err => next(err))
})
.post(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{
    req.body.user = req.user._id;
    Comments.create(req.body)
    .then((comment) =>{
        Comments.findById(comment._id)
        .populate('user')
        .then((comment) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(comment);
        })

    }, err => next(err))
    .catch(err => next(err))
})
.put(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{
    res.statusCode = 403;
    res.end(req.method + " method is not supported for the REST API endpoint " + req.originalUrl);
})
.delete(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{
    Comments.remove({})
    .then((response) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response)
    },
    err => next(err))
    .catch(err => next(err))
});

// /comments/commentId
commentRouter.route('/:commentId')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) =>{
    Comments.findById(req.params.commentId)
    .populate('user')
    .then((comment) =>{
        if (comment !== null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(comment);
        }else{
            err = new Error("Product not found");
            next(err);
        }
    },
    err => next(err))
    .catch(err => next(err))
})
.post(cors.corsWithOpts, auth.verifyUser, auth.verifyOwner, (req, res, next) =>{
    res.statusCode = 403;
    res.end(req.method + " method is not supported for the REST API endpoint " + req.originalUrl);
})
.put(cors.corsWithOpts, auth.verifyUser, auth.verifyOwner, (req, res, next) =>{
    Comments.findByIdAndUpdate(req.params.commentId, {$set: req.body}, {new: true})
    .then(() =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, message: "Comment updated successfully"});
    },
    err => next(err))
    .catch(err => next(err))
})
.delete(cors.corsWithOpts, auth.verifyUser, auth.verifyOwner, (req, res, next) =>{
    console.log(req.params.commentId)
    Comments.findByIdAndRemove(req.params.commentId)
    .then((resp) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    },
    err => next(err))
    .catch(err => next(err))
});

module.exports = commentRouter;