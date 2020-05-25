const Category = require('../models/categoryModel');

// To Add Catgory//
const addCategory = (req, res) => {
    const { title, isActive, isDeleted } = req.body;
    console.log(req.body);


    Category.find({ title: title }).then((ress) => {
        if (ress.length > 0) {
            return res.json({
                error: 'This Category Already exits'
            })
        }
        const category = new Category({ title, isActive, isDeleted });
        console.log(category);
        category.save().then((result) => {
            console.log('The catgory added is ', result);  
            return res.json({Message:`Category ${(title)} is added`});

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
const getCategory =(req,res)=>{
    Category.find().populate({path:'subCategory',populate:{path:'products'}}).then((ress)=>{

        console.log(ress);
        let category=ress;
        let newCategory =category.filter((prods)=>{
            return prods.isDeleted==false;
        })
        return res.json({
            Category:newCategory,
        })
    }

    // Category.findOne({title:"Grocery"}).populate('subCategory').then((subcategory)=>{
    //    console.log('subacategory is',subcategory);
    //    return res.json({
    //        Message:subcategory
    //    })
    // }
    ).catch((err)=>{
        console.log(err);
        return res.json({
            error:err,
        })
    })

}
  
 
//To Delete Category//or change its status isDeleted == true
const deleteCategory =(req,res)=>{
    console.log(req.body.id);
    Category.findById(req.body.id).then((category)=>{
        console.log('your category find by id is ',category);
        category.isDeleted=true;
        category.save().then((ress)=>{
            console.log(ress);
            return res.json({Messge:`${(category.title)} is Deleted` });
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
const updateCategory=(req,res)=>{
    const {title,isActive,isDeleted,id}=req.body
    Category.findById(id).then((category)=>{
        console.log(category);

        category.title=title;
        category.isActive=isActive;
        category.isDeleted=isDeleted;
       
        category.save().then((ress)=>{
            console.log(ress);
            return res.json({Message:`${(category.title)} is Updated`});
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


module.exports = { addCategory ,getCategory,deleteCategory,updateCategory};