const express = require('express');
const mongoose = require('mongoose');
const multer =require('multer');
const fs =require('fs');

//const upload=multer();


const bodyParser = require('body-parser')



const dbConnection =require('./database/db');
const routes =require('./routes/routes');

const PORT =5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));







//app.use(express.json());

dbConnection();

app.use('/',routes);
   



app.listen(PORT,()=>{
    console.log('server is listening on Port ',PORT);
})

