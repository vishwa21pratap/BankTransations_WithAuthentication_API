const express = require('express');
const router = express.Router();
const {restrictToLoggedinUserOnly,checkAuth}=require('../middleware/auth');
const {getBalance,creditMoney,debitMoney}=require('../controller/transactions');
router.use(checkAuth);

router.get('/balance',restrictToLoggedinUserOnly,getBalance);
router.put('/credit',restrictToLoggedinUserOnly,creditMoney);
router.put('/debit',restrictToLoggedinUserOnly,debitMoney);

module.exports=router;
