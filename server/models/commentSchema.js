const mongoose = require('mongoose');

// Comment Model
var commentSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        product_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        comment:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Comment', commentSchema);