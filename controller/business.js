const Business=require('../model/bussiness');
const mongoose=require('mongoose');


async function createBusiness(req,res){
    const {username,password}=req.body;
    const existBuss=await Business.findOne({username});
    if(existBuss) return res.status(409).json({error:"This Business Already exists "});
    const newbus=await Business.create({
        username,password
    });
    return res.status(201).json(newbus);
}

async function businessInfo(req, res) {
    const businessId = req.business._id; // Get the ID of the logged-in business

    // Find the business by ID and populate its accounts
    const buss = await Business.findById(businessId).populate('accounts');

    // If the business is not found, return a 404 error
    if (!buss) {
        return res.status(404).json({ error: "Error: No Such Business Exists" });
    }
    const usernameFromRequest = req.params.name; // Assuming you're passing the business username in the request URL
    if (buss.username !== usernameFromRequest) {
        return res.status(403).json({ error: "You are not allowed to access this business" });
    }

    // Return the business details with accounts
    return res.status(200).json(buss);
}


async function deleteBusiness(req, res) {
    const businessId = req.business._id; // Get the ID of the logged-in business

    // Find the business by ID
    const buss = await Business.findById(businessId);
    if (!buss) return res.status(404).json({ error: "Error: No Such Business Exists" });

    // Optionally, you can verify the username in the request against the logged-in business
    const usernameFromRequest = req.params.name; // Assuming you're passing the business username in the request URL
    if (buss.username !== usernameFromRequest) {
        return res.status(403).json({ error: "You are not allowed to delete this business" });
    }

    // Delete the business
    await Business.deleteOne({ _id: businessId });

    return res.status(200).json({ message: "Business deleted successfully" });
}

async function updateBusiness(req, res) {
    const businessId = req.business._id; // Get the ID of the logged-in business

    // Find the business by ID
    const buss = await Business.findById(businessId);
    if (!buss) return res.status(404).json("Error: No Such Business Exists");
    const usernameFromRequest = req.params.name; // Assuming you're passing the business username in the request URL
    if (buss.username !== usernameFromRequest) {
        return res.status(403).json({ error: "You are not allowed to Update this business" });
    }

    const updateDetails = req.body;

    // Update the business only if it exists
    const updatedBusiness = await Business.findByIdAndUpdate(businessId, updateDetails, {
        new: true, // Return the updated document
    });

    // Check if the update was successful
    if (!updatedBusiness) {
        return res.status(400).json({ error: "Error updating business details" });
    }

    return res.status(200).json({ message: "User Updated Successfully", updatedBusiness });
}


module.exports={createBusiness,businessInfo,deleteBusiness,updateBusiness}