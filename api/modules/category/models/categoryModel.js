const mongoose = require('mongoose');
const schema = mongoose.Schema;

const category = new schema({
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

    subCategory:[{
        type:schema.Types.ObjectId,
        ref:"SubCategory",
    }],

  


      },
      {
     timestamps:true,
     
      });

      const Category =mongoose.model('Category',category);
      module.exports=Category;

