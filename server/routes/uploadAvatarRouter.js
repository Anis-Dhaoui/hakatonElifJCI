const express = require('express');
const auth = require('../auth');
const multer = require('multer');
const cors = require('./cors');
const fs = require('fs');

const uploadAvatarRouter = express.Router();
uploadAvatarRouter.use(express.json());

// Configure destination upload of the image file and with which name
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/avatars');
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

const upload = multer({storage: storage, fileFilter: imageFilter});

uploadAvatarRouter.route('/')
.options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
.post(cors.corsWithOpts, upload.single('avatar'), (req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(req.file);
})

// uploadAvatarRouter.route('/delete')
// .options(cors.corsWithOpts, (req, res) => res.sendStatus(200))
// .delete(cors.corsWithOpts, auth.verifyUser, (req, res, next) =>{
//     var notExistFiles = [];
//     var deletedFiles = [];
//     for(let i of req.body){
//         if(!fs.existsSync(`public/${i}`)){
//             notExistFiles.push(i);
//         }else{
//             fs.unlink(`public/${i}`, (err) =>{
//                 if(err) next(err);
//             });
//             deletedFiles.push(i);
//         }
//     }
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.json({notExistFiles: notExistFiles, deletedFiles: deletedFiles}); 
// });

module.exports = uploadAvatarRouter;