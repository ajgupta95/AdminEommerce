const {body,validationResult}=require('express-validator');


const subCategoryValidationRules=()=>{
    return [
        body('title').isString().isLength({min:3}),
        body('isActive').isBoolean(),
        body('isDeleted').isBoolean(),
        body('categoryId').isString(),
        

    ]
}

const validate =(req,res,next)=>{
    console.log(req.body);
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

module.exports={subCategoryValidationRules,validate};