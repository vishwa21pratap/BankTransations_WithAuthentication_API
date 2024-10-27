const jwt = require('jsonwebtoken');
const secret = "Vishwa$saloni$babu";

function setBusiness(business) {
    return jwt.sign({
        _id: business._id,
        username: business.username, // Use username instead of email
    }, secret);
}

function getBusiness(token) {
    if (!token) return null; // Return null if no token is provided
    try {
        return jwt.verify(token, secret); // Verify the token and return the decoded business object
    } catch (error) {
        return null; // Return null if verification fails
    }
}


module.exports = { getBusiness, setBusiness };
