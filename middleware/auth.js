const { getBusiness } = require('../service/auth');

async function restrictToLoggedinUserOnly(req, res, next) {
    const businessUid = req.cookies?.uid; 
    // console.log("Business UID from Cookies:", businessUid); // Debugging line
    if (!businessUid) return res.status(401).json({ Error: "You are not Logged In" });

    const business = getBusiness(businessUid);
    // console.log("Decoded Business:", business); // Debugging line
    if (!business) return res.status(401).json({ Error: "You are not Logged In" });

    req.business = business;
    next();
}


async function checkAuth(req, res, next) {
    const businessUid = req.cookies?.uid;
    const business = getBusiness(businessUid);

    req.business = business; // Correctly assign the business object to req
    next();
}

module.exports = { restrictToLoggedinUserOnly, checkAuth };
