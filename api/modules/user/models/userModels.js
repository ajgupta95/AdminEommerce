const mongoose =require('mongoose');
const schema =mongoose.Schema;


const user = new schema({
    name:{
        type:String,
        required:true,
        trim:true
    },

    hashPassword:{
        type:String,
        required:true,
        trim:true
    },
    email:{
     type:String,
     required:true,
     trim:true
    },
    mobileNumber:{
        type:Number,
        required:true,
        trim:true
    },

    mobileVerification:{
      type:Boolean,
      required:true,
      trim:true
    },

    isActive: {
        type: Boolean,
        required: true,
        trim: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        trim: true
    },

},
{
    timestamps:true,
    
     }
);



const User =mongoose.model('User',user);
module.exports=User;