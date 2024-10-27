const express=require('express');
const mongoose=require('mongoose');
const cookieParser = require('cookie-parser');
const bodyparser=require('body-parser');
const businessRoute=require('./routes/business.js')
const {connectToMongoDB}=require('./connection.js');
const accountRoute=require('./routes/accounts.js');
const {restrictToLoggedinUserOnly}=require("./middleware/auth.js")
const transactionRoute=require('./routes/transactions.js');


const app=express();
app.use(bodyparser.json());
app.use(cookieParser());
const PORT=8007;


connectToMongoDB("mongodb://127.0.0.1:27017/payment").then(()=>{
    console.log("MongoDB Connected");
});

app.use('/api/business', businessRoute);
app.use('/api/account', restrictToLoggedinUserOnly, accountRoute); 
app.use('/api/transactions',restrictToLoggedinUserOnly,transactionRoute)
// app.use('/api/server',serverRoute);
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})