const {Router}= require('express');


const userController=require('../controller/userController');
const {userValidationRules,validate,userAuthValidation}=require('../validation/userValidation');

const router =Router();

router.post('/addUser',userValidationRules(),validate,userController.addUser);
router.post('/authUser',userAuthValidation(),validate,userController.authUser);
router.post('/deleteUser',userController.deleteUser);
router.post('/changePassword',userController.changePassword);


module.exports=router;