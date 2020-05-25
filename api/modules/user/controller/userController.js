const User =require('../models/userModels');
const bcrypt=require('bcrypt');
const jsonwebtoken=require('jsonwebtoken');



const addUser=  (req,res)=>{
    console.log('req body is',req.body);
    const {name,password,conformPassword,email,isActive,isDeleted,mobileVerification,mobileNumber}=req.body;

    if(password!==conformPassword){
        return res.json({
            message:"Please match your passwords"
        })
    }

    User.findOne({email:email}).then(async(ress)=>{
        let user=ress;
        if(user){
            console.log(user);
            return res.json({
                message: " This User already exits"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
         user = await new User({name,hashPassword,email,isActive,isDeleted,mobileVerification,mobileNumber});
        await user.save().then((user)=>{
            console.log('User is',user);
            return res.json({
                message:`${(name)} is added`,
            })

        }).catch((err)=>{
            console.log(err);
            return res.json({
                message :err
            })
        })

       }).catch((err)=>{
        console.log(err);
        return res.json({
            message :err
        })
    })

}

const authUser =(req,res)=>{
      console.log('Req body is',req.body);
      const {email,password}=req.body;
  
      User.findOne({email:email}).then(async(ress)=>{
          console.log('user is',ress);
          let user =ress;
          if(!user){
              return res.json({
                  message :"Please enter correct Email "
              })
          }
          const validPassword = await bcrypt.compare(password,user.hashPassword);
          console.log('comparing password',validPassword);
          if(!validPassword){
            return res.json({
                message :"Please enter correct Password "
            })
          }
          const token =await jsonwebtoken.sign({id:user.id,name:user.name,email:user.email},"AjayAdminNode");
          return res.header('Auth-Token',token).json({
              token:token
          });


      }).catch((err)=>{
        console.log(err);
        return res.json({
            message :err
        })
    })


}

const deleteUser=(req,res)=>{
    console.log("req body is",req.body);
    const {password}=req.body;
    const headerToken =req.headers['auth-token'];


    console.log('header',headerToken);

    const userData=jsonwebtoken.verify(headerToken,'AjayAdminNode');
    console.log(userData);

    User.findById(userData.id).then(async(ress)=>{
        console.log('user is ',ress);
        let user =ress;
        // if(!user){
        //     return res.json({
        //         message :"Please enter correct Email "
        //     })
        // }
       // console.log('total',user);
       const validPassword = await bcrypt.compare(password,user.hashPassword);
       console.log('comparing password',validPassword);
       if(!validPassword){
         return res.json({
             message :"Please enter correct Password "
         })
       }

       user.isDeleted=true;
         const usersaved= await user.save();
         console.log(usersaved);

         return res.json({
             message:`${(user.name)} is deleted`,
         });



    }).catch((err)=>{
        console.log(err);
        return res.json({
            message :err
        })
    })

} 

const changePassword =(req,res)=>{
    console.log("req body is",req.body);
    const {password,newPassword}=req.body;
    const headerToken =req.headers['auth-token'];


    console.log('header',headerToken);

    const userData=jsonwebtoken.verify(headerToken,'AjayAdminNode');
    console.log(userData);

    User.findById(userData.id).then(async(ress)=>{
        console.log('user is ',ress);
        let user =ress;
       
       const validPassword = await bcrypt.compare(password,user.hashPassword);
       console.log('comparing password',validPassword);
       if(!validPassword){
         return res.json({
             message :"Please enter correct Password "
         })
       };
       const salt = await bcrypt.genSalt(10);
       const hashPassword = await bcrypt.hash(newPassword,salt);
       user.hashPassword=hashPassword;
       const userWithChangedPassord= await user.save();
       console.log(userWithChangedPassord);

       return res.json({
           message:`${(user.name)} your password is updated`,
       })





    }).catch((err)=>{
        console.log(err);
        return res.json({
            message :err
        })
    })



}

module.exports= {addUser,authUser,deleteUser,changePassword};
