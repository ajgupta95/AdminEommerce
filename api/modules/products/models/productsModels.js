const mongoose = require('mongoose');
const schema = mongoose.Schema;

const product = new schema({
    subCategoryId: {
        type: String,
        required: true,
        trim: true
    },
    productName: {
        type: String,
        required: true,
        trim: true
    },
    productDescription: {
        type: String,
        required: true,
        trim: true
    },
    imagePath: {
        type: String,
        required: true,
        trim: true
    },
    productBasePrice: {
        type: Number,
        required: true,
        trim: true
    },
   flatDiscount: {
        type: Boolean,
        required: true,
        trim: true,
    },

    discountAmount:{
        type:Number,
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
     
      });

      const Product =mongoose.model('Products',product);
      module.exports=Product;

