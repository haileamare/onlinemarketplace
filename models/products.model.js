import mongoose from 'mongoose';

const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:"Product Name is Required"
    },
    description:{
        type:String,
        trim:true
    },
    category:{
        type:String
    },
    quantity:{
        type:Number,
        required:"Quantity is required"
    },
    price:{
        type:Number,
        required:"price is required"
    },
    shop:{
        type:mongoose.Schema.ObjectId,
        ref:'Shop'
    },
    updated:Date,
    created:{
        type:Date,
        default:Date.now
    },
    image:{
        url:{
            type:String
        },
        public_url:{
            type:String
        },
        original_filename:{
            type:String
        },
        bytes:{
            type:String
        }
    },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);