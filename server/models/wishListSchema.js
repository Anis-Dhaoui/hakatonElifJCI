const mongoose = require('mongoose'); 

var wishListSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    wishlist:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
},
{
    timestamps: true,
    // $pushAll operator is no longer supported in Mongo 3.6.x+, and to fix this issue we add this entrie
    usePushEach: true
});


//Export the model
module.exports = mongoose.model('WishList', wishListSchema);