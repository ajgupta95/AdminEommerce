const {Router}= require('express');

const adminRoutes =require('../api/modules/admin/routes/routes');
const categoryRoutes=require('../api/modules/category/routes/routes');

const productsRoutes=require('../api/modules/products/routes/routes');
const subCategoryRoutes=require('../api/modules/sub_category/routes/routes');
const userRoutes =require('../api/modules/user/routes/userRoutes');


const router =Router();


router.use('/admin', adminRoutes );

router.use('/category',categoryRoutes);
router.use('/products',productsRoutes);
router.use('/subCategory',subCategoryRoutes);
router.use('/user',userRoutes)





module.exports =router;


