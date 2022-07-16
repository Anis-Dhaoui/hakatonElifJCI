const express = require('express');
const cors = require('cors');

const whiteList =[
    "http://localhost:3001",
    "https://localhost:3443",
    "http://localhost:3000"
];

var corsOptions = (req, cb) =>{
    var corsOpts;
    if(whiteList.indexOf(req.header('Origin')) !== -1){
        corsOpts = {origin: true};
    }else{
        corsOpts = {origin: false};
    }
    cb(null, corsOpts);
};

exports.cors = cors();
exports.corsWithOpts = cors(corsOptions);