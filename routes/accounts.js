const express=require('express');
const router=express.Router();
const {getAccount,createAccount,updateAccount,deleteAccount}=require('../controller/accounts');
const { restrictToLoggedinUserOnly, checkAuth } = require('../middleware/auth');

router.use(checkAuth); 
router.get('/:id', restrictToLoggedinUserOnly, getAccount);
router.post('/create', restrictToLoggedinUserOnly, createAccount);
router.put('/update/:id', restrictToLoggedinUserOnly, updateAccount);
router.delete('/delete/:id', restrictToLoggedinUserOnly, deleteAccount);


module.exports=router;