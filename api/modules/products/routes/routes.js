const {Router }=require('express');
const multer=require('multer');
const path = require('path');

 const productController=require('../controller/productsController');
 const {productValidationRules,validate}=require('../validation/productsValidation');

// const uploadFilter =(req,file,cb)=>{
//     console.log('here');
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('Only image files are allowed!'));
//     }
//     cb(null, true);
// }

// const upload = multer({ dest: 'uploads/',
//       fileFilter:uploadFilter,

// fileFilter: function (req, file, cb) {
//     console.log('here');
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('Only image files are allowed!'));
//     }
//     cb(null, true);
//   }
//});

//upload.single('productImage');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
    callback(null, './uploads/');
    },
    // fileFilter: function(req,file, cb){
    //     console.log('hereer==========>>>>>.');
    // const extension = path.extname(file.originalname).toLowerCase()
    // const mimetyp = file.mimetype 
    // if(extension !== '.jpg' || extension !== '.jpeg' || extension !== '.png' || mimetyp 
    // !== 'image/png' || mimetyp !== 'image/jpg' || mimetyp !== 'image/jpeg' ){
    //   return cb('error message', true)
    // } 
  
  
    // },
    filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '.jpg');
    }
    });

    const fileFilter=function(req,file, cb){
        
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
          } else {
            cb(null, false);
          }
  
    };

  
    const upload=multer({storage:storage, fileFilter:fileFilter ,});
  



const router =Router();

router.post('/addProduct',upload.single('productImage'),productValidationRules(),validate,productController.addProduct);
router.get('/getProducts',productController.getProducts);
router.post('/deleteProduct',productController.deleteProduct);
router.post('/updateProduct',upload.single('productImage'),productValidationRules(),validate,productController.updateProduct);

module.exports =router;
