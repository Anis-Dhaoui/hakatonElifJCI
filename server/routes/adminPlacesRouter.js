const express = require('express');
const adminPlace = require('../models/adminPlacesSchema');
const mongoose = require('mongoose');
const auth = require('../auth');
const cors = require('./cors');

const adminPlacesRouter = express.Router();
adminPlacesRouter.use(express.json());

// /place/
adminPlacesRouter.route('/')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) =>{
    adminPlace.find({})
    .then((place) =>{
        if (place !== null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(place);
        }else{
            err = new Error("adminPlace collection is empty or not found");
            next(err);
        }
    },
    err => next(err))
    .catch(err => next(err))
})

// /place/:placeId/
adminPlacesRouter.route('/:placeId')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) =>{
    adminPlace.findById(req.params.placeId)
    .then((place) =>{
        if (place != null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(place);
        }else{
            err = new Error("Product not found");
            next(err);
        }
    },
    err => next(err))
    .catch(err => next(err))
})


module.exports = adminPlacesRouter;