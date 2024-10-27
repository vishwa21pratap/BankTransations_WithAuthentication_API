const { setBusiness } = require('../service/auth');
const Business=require('../model/bussiness');

// In your login route
async function loginBusiness(req, res) {
    const { username, password } = req.body;

    const business = await Business.findOne({ username });
    if (!business || business.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = setBusiness(business);
    
    // Set the token in a cookie
    res.cookie('uid', token, {
        httpOnly: true, // Prevent client-side JavaScript access
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 3600000, // Cookie expiry time (1 hour)
    });

    return res.status(200).json({ message: "Login successful" });
}


module.exports={loginBusiness};
