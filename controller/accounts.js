const Account=require('../model/accounts')
const Business=require('../model/bussiness');
const mongoose=require('mongoose');
async function getAccount(req,res){
    const id=Number(req.params.id);
    const acc = await Account.findOne({
        accountNumber: id,
        business: req.business._id // Ensure the account belongs to the authenticated business
    });
    if(!acc) return res.status(404).json({Error:"No such accounts exists Or You are unauthorized to access it"});
    return res.status(200).json(acc);
}

async function createAccount(req, res) {
    const { accountNumber, sortCode, status, allowCredit, allowDebit, balance } = req.body;

    const businessId = req.business._id; // Get the logged-in business ID from the request

    // Check if the account number already exists
    const acc = await Account.findOne({ accountNumber: accountNumber });
    if (acc) return res.status(400).json({ error: "This Account Number Already Exists" });

    // Create a new account linked to the logged-in business
    const newAccount = await Account.create({
        business: businessId, // Use the logged-in business ID
        accountNumber,
        sortCode,
        status: status || 'ACTIVE', // Default to 'ACTIVE' if not provided
        allowCredit: allowCredit !== undefined ? allowCredit : true, // Default to true if not provided
        allowDebit: allowDebit !== undefined ? allowDebit : true,
        balance: balance || 0, // Default to 0 if not provided
    });

    // Update the business document to include the new account ID
    await Business.findByIdAndUpdate(
        businessId,
        { $push: { accounts: newAccount._id } }, // Push the new account's ID into the accounts array
        { new: true } // Return the updated business document
    );

    return res.status(201).json(newAccount);
}


async function updateAccount(req,res){
    const id=Number(req.params.id);
    const acc = await Account.findOne({
        accountNumber: id,
        business: req.business._id // Ensure the account belongs to the authenticated business
    });
    if(!acc) return res.status(404).json("Error: No Such Account Exists Or you cannot Change it");
    const updateDetails=req.body;
    const updateacc=await Account.findOneAndUpdate({accountNumber:id},
        updateDetails,{
            new:true,
        }
    );
    return res.status(200).json({message:"Account Updated Successfully"});
    
 }


 async function deleteAccount(req,res){
    const id=Number(req.params.id);
    const acc = await Account.findOne({
        accountNumber: id,
        business: req.business._id // Ensure the account belongs to the authenticated business
    });
    if(!acc) return res.status(404).json("Error: No Such Account Exists Or You Cannot Delete it");
    const del=await Account.deleteOne({accountNumber:id});
    return res.status(200).json({message:"Account deleted Successfully"});
}




module.exports={
    getAccount,
    createAccount,
    updateAccount,
    deleteAccount
}