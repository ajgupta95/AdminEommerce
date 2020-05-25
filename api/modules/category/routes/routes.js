const {Router}= require('express');


const categoryController=require('../controller/categoryController');
const {categoryValidationRules,validate}=require('../validation/categoryValidation');

const router =Router();


router.post('/addCategory', categoryValidationRules(), validate,  categoryController.addCategory );
router.get('/getCategory',categoryController.getCategory);
router.post('/deleteCategory',categoryController.deleteCategory);
router.post('/updateCategory',categoryController.updateCategory);


module.exports =router;