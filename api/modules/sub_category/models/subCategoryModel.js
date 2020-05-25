const mongoose = require('mongoose');
const schema = mongoose.Schema;

const subcategory = new schema({
    title: {
        type: String,
        required: true,
        trim: true
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

    categoryId:{
        type:String,
        required:true,
        trim:true
    },
   

    products:[{
        type:schema.Types.ObjectId,
        ref:"Products"
    }]

    

      },
      {
     timestamps:true,
     
      });

      const SubCategory =mongoose.model('SubCategory',subcategory);
      module.exports=SubCategory;

