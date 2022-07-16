const express = require('express');
const auth = require('../auth');
const multer = require('multer');
const cors = require('./cors');
const fs = require('fs');

const uploadProdImgsRouter = express.Router();
uploadProdImgsRouter.use(express.json());

// Configure destination upload of the image file and with which name
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/products');
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

// Check uploaded file extension
const imageFilter = (req, file, cb) =>{
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        cb(null, true);
    }else{
        const err = new Error("This file is not an image");
        cb(err, false)
    }
};

const upload = multer({storage: storage, fileFilter: imageFilter}).array('images', 8);

uploadProdImgsRouter.route('/')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.post(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{
    upload(req, res, (err) =>{
        if(err instanceof multer.MulterError){
            if(err.code === "LIMIT_UNEXPECTED_FILE"){
                res.statusCode = 429;
                res.statusMessage = "You could not upload more than 8 pictures"
                res.end();
            }
        }else if (err){
            res.statusCode = 500;
            res.statusMessage = "Something went wrong"
            res.end();
        }
        else{
            res.statusCode = 200;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(req.file);
        }
    })
});

uploadProdImgsRouter.route('/delete')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.delete(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{
    var notExistFiles = [];
    var deletedFiles = [];
    for(let i of req.body){
        if(fs.existsSync(`public/${i}`)){
            if(i.includes(req.user._id)){
                fs.unlink(`public/${i}`, (err) =>{
                    if(err) next(err);
                });
                deletedFiles.push(i);
            }else
            console.log("This is not your own picture");
            continue;
        }else{
            notExistFiles.push(i);
        }
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({notExistFiles: notExistFiles, deletedFiles: deletedFiles}); 
});

module.exports = uploadProdImgsRouter;