const {Router}= require('express');


const subCategoryController=require('../controller/subCategoryController');
const {subCategoryValidationRules,validate}=require('../validation/subCategoryValidation');

const router =Router();


router.post('/addSubCategory', subCategoryValidationRules(), validate,  subCategoryController.addSubCategory );
router.get('/getSubCategory',subCategoryController.getSubCategory);
router.post('/deleteSubCategory',subCategoryController.deleteSubCategory);
router.post('/updateSubCategory',subCategoryController.updateSubCategory);


module.exports =router;