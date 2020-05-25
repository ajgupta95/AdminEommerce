const express = require('express');
const mongoose = require('mongoose');


 const dbConnection= ()=>{mongoose.connect('mongodb://localhost:27017/AdminPanel',{useNewUrlParser: true})
                .then((res)=>{console.log('connected to db');})
                .catch((err)=>{
                    console.log('Not connected to db',err);
                })};



module.exports =dbConnection;