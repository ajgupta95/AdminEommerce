const Product =require('../models/productsModels');

const multer = require('multer');


// To add products
const addProduct= (req,res)=>{
    console.log(req.body);
    console.log('file',req.file);
   
    if(req.file===undefined){
        //console.log('herer image',image);
        return res.json({
            error:" Please upload Image "
        })
    };
    let image =req.file
    let imagePath = image.path
    const {productName,productDescription,productBasePrice,subCategoryId,isActive,isDeleted,
        flatDiscount,discountAmount} =req.body;

        const product = new Product ({productBasePrice,productDescription,productName,
            imagePath,isActive,isDeleted,flatDiscount,subCategoryId,discountAmount});
            
            product.save().then((ress)=>{
                console.log(ress);
                return res.json({
                    message:`${(productName)} is added`
                });
            }).catch((err)=>{
               // console.log(err);
                return res.json({
                    error:err
                });
            })



}

//To get Products
const getProducts=(req,res)=>{
    Product.find().then((ress)=>{
        console.log(ress);
        let products=ress;
        let newProducts =products.filter((prods)=>{
            return prods.isDeleted==false;
        })
        return res.json({
            products:newProducts
        })
    }).catch((err)=>{
        return res.json({
            error:err
        });
    })
}
   
// To delete Product

const deleteProduct =(req,res)=>{

   
    console.log(req.body.id);
    Product.findById(req.body.id).then((product)=>{
        console.log('your product find by id is ',product);
        product.isDeleted=true;
        product.save().then((ress)=>{
            console.log(ress);
            return res.json({Messge:`${(product.productName)} is Deleted` });
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

// To update Product

const updateProduct =(req,res)=>{
    
    Product.findById(req.body.id).then((product)=>{
        let imagePath ;
        if(req.file===undefined){
        imagePath=product.imagePath;
        console.log(imagePath);
        
        }else{
             imagePath =req.file.path;
             console.log(imagePath);

        }
        console.log('Updating this product',product);

        console.log('your image file',req.file);
        
        
    
        const {productName,productDescription,productBasePrice,subCategoryId,isActive,isDeleted,
            flatDiscount,discountAmount} =req.body;

            product.productName=productName;
            product.productDescription=productDescription;
            product.productBasePrice=productBasePrice;
            product.subCategoryId=subCategoryId;
            product.isActive=isActive;
            product.isDeleted=isDeleted;
            product.flatDiscount=flatDiscount;
            product.discountAmount=discountAmount;
            product.imagePath=imagePath;

        product.save().then((ress)=>{
            console.log('ress after updating',ress);
            res.json({
                message:`${(productName)} is Updated`
            })
        }).catch((err)=>{
            console.log(err);
           return res.json({
                error:err,
            })
        })
    }).catch((err)=>{
        console.log(err);
       return res.json({
            error:err,
        })
    })
}


module.exports={addProduct,getProducts,deleteProduct,updateProduct};