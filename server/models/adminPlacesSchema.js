const mongoose = require('mongoose');

var adminPlacesSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique: true
        },
        description:{
            type:String,
            required:true
        },
        images: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('AdminPlace', adminPlacesSchema);