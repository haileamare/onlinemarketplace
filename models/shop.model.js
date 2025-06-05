import mongoose from 'mongoose';

const ShopSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:'Name is required'
    },
    description:{
        type:String,
        trim:true
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
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    updated:Date,
    created:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.models.Shop || mongoose.model('Shop',ShopSchema)