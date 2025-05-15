import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:'Name is required'
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        match:[/.+\@.+\..+/,'Please fill al valid email'],
        required:true
    },
    hashed_password:{
        type:String
    },
    about:{
        type:String,
        trim:true,
        default:''
    },
    created:{
        type:Date,
        default:Date.now
    },
    updated:Date,
    seller:{
        type:Boolean,
        default:false
    },
    image:{
        url:{
            type:String,
        },
        public_id:{
            type:String,
        },
        original_filename:{
            type:String
        },
        bytes:{
            type:String
        },
        alt:{
            type:String,
            default:'User Profile image'
        }
    }
});

UserSchema.virtual('password').
set(function(password){
    this._password=password  
    this.hashed_password=this.encryptPassword(password)
}).
get(function(){
    return this._password
})
UserSchema.methods={
    encryptPassword: function (password){
        if(!password) return '';
        try{
            let hashedp=bcrypt.hashSync(password,12)
            return hashedp
        }catch(err){
            return ''
        }
    },
    verifyPassword:async function(password){
        console.log('password',password)
      return  await bcrypt.compare(password,this.hashed_password)
    }
};

UserSchema.path('hashed_password').validate(function(){
    if(this._password && this._password.length <6){
        this.invalidate('password','Password must be atleast 6 chars')
    }
    if(this.isNew && !this._password){
        this.invalidate('password','Password is reqiured')
    }
},null)

export default mongoose.models.User || mongoose.model('User',UserSchema)