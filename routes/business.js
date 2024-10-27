const express = require('express');
const router = express.Router();
const { createBusiness, businessInfo, deleteBusiness, updateBusiness } = require('../controller/business');
const {loginBusiness}=require('../routes/login');
const {restrictToLoggedinUserOnly,checkAuth}=require('../middleware/auth');

// const verifyLogin = require('../middlewares/verifyLogin'); 
// const {loginBusiness}=require('../service/logged');

// // No login verification needed for creating a business
// router.post('/login', loginBusiness); 
 
router.post('/create', createBusiness);
router.post('/login',loginBusiness);
router.use(checkAuth);
// Protected routes, accessible only by logged-in businesses
router.get('/details/:name',restrictToLoggedinUserOnly,  businessInfo);
router.delete('/delete/:name', restrictToLoggedinUserOnly, deleteBusiness);
router.put('/update/:name',restrictToLoggedinUserOnly,  updateBusiness);


module.exports = router;
