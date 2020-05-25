const {body,validationResult}=require('express-validator');


const userValidationRules=()=>{
    return [
        body('name').isString().isLength({min:4}),
        body('password').notEmpty().isLength({min:5}).withMessage('Password must be 5 character long'),
        body('email').isEmail(),
        body('mobileNumber').isNumeric().isLength({min:10,max:10}).withMessage('please enter appropriate mobile number'),
        body('conformPassword').notEmpty().isLength({min:5}),
        body('mobileVerification').isBoolean(),




        body('isActive').isBoolean(),
        body('isDeleted').isBoolean(),
        

    ]
}

const userAuthValidation=()=>{
    return [
      
        body('password').notEmpty().isLength({min:5}).withMessage('Password must be 5 character long'),
        body('email').isEmail().withMessage('Plase Enter valid Email'),
       
        

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

module.exports={userValidationRules,validate,userAuthValidation};