const {check,body,validationResult}=require('express-validator');




const productValidationRules=()=>{
    return [
        body('productName').isString().isLength({min:3}),
        body('productDescription').isString().isLength({min:5}),
       // check('productImage').notEmpty().withMessage('Not present'),
        body('productBasePrice').isString(),
        body('flatDiscount').isString(),
        body('subCategoryId').isString(),
        body('discountAmount').isNumeric(),
        body('isActive').isBoolean(),
        body('isDeleted').isBoolean(),
        

    ]
}

const validate =(req,res,next)=>{
    console.log(req.body);
    console.log(req.file);
    const errors =validationResult(req)
    if(errors.isEmpty()){
        return next()
    }

    const extractedErrors=[];
    errors.array().map(err=>extractedErrors.push({[err.param]:err.msg}));

    return res.status(422).json({
        errors:extractedErrors,
    })
}

module.exports={productValidationRules,validate};