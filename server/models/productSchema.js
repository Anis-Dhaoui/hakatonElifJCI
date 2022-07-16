const mongoose = require('mongoose');
// require ('mongoose-currency').loadType(mongoose);
// const Currency = mongoose.Types.Currency;

// Plate Model
var productSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name:{
            type:String,
            required:true,
            unique: true
        },
        description:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true,
            min: 0
        },
        published:{
            type:Boolean,
            default:true,
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

module.exports = mongoose.model('Product', productSchema);