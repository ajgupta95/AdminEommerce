const SubCategory = require('../models/subCategoryModel');

// To Add Catgory//
const addSubCategory = (req, res) => {
    const { title, isActive, isDeleted ,categoryId} = req.body;
    console.log(req.body);


    SubCategory.find({ title: title }).then((ress) => {
        if (ress.length > 0) {
            return res.json({
                error: 'This SubCategory Already exits'
            })
        }
        const subcategory = new SubCategory({ title, isActive, isDeleted ,categoryId});
        console.log(subcategory);
        subcategory.save().then((result) => {
            console.log('The subcatgory added is ', result);  
            return res.json({Message:`SubCategory ${(title)} is added`});

        })
            .catch((err) => {
                console.log('Error caught is', err);
                return res.json({
                    error: err,
                })

            })
    })

}
//To Get category//
const getSubCategory =(req,res)=>{
    SubCategory.find().populate('products').then((ress)=>{

        console.log(ress);
        let subcategory=ress;
        let newSubCategory =subcategory.filter((prods)=>{
            return prods.isDeleted==false;
        })
        return res.json({
            SubCategory:newSubCategory,
        })
    }).catch((err)=>{
        console.log(err);
        return res.json({
            error:err,
        })
    })

}
  
 
//To Delete Category//or change its status isDeleted == true
const deleteSubCategory =(req,res)=>{
    console.log(req.body.id);
    SubCategory.findById(req.body.id).then((subcategory)=>{
        console.log('your subcategory find by id is ',subcategory);
        subcategory.isDeleted=true;
        subcategory.save().then((ress)=>{
            console.log(ress);
            return res.json({Messge:`${(subcategory.title)} is Deleted` });
        }).catch((err)=>{
            console.log(err);
            return res.json({
                error:err,
            })
        } )
    }).catch((err)=>{
        console.log(err);
       return res.json({
            error:err,
        })
    })
}
//To Update Category
const updateSubCategory=(req,res)=>{
    const {title,isActive,isDeleted,id,categoryId}=req.body
    SubCategory.findById(id).then((subcategory)=>{
        console.log(subcategory);

        subcategory.title=title;
        subcategory.isActive=isActive;
        subcategory.isDeleted=isDeleted;
        subcategory.categoryId=categoryId
       
        subcategory.save().then((ress)=>{
            console.log(ress);
            return res.json({Message:`${(subcategory.title)} is Updated`});
        }).catch((err)=>{
            console.log(err);
           return res.json({
                error:err,
            })
        })

    }).catch((err)=>{
        console.log(err);
      return  res.json({
            error:err,
        })
    })
}


module.exports = { addSubCategory ,getSubCategory,deleteSubCategory,updateSubCategory};