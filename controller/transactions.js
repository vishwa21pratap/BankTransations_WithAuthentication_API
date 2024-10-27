const Business=require('../model/bussiness');
const Account=require('../model/accounts');
const Transaction=require('../model/transactions');

async function getBalance(req,res){
    const {accountNumber,sortCode}=req.body;
    const acc = await Account.findOne({
        accountNumber: accountNumber,
        sortCode:sortCode,
        business: req.business._id // Ensure the account belongs to the authenticated business
    });
    if(!acc) return res.status(404).json({Error:"No such accounts exists Or You are unauthorized to access it"});
    if(acc.status==="INACTIVE") return res.status(401).json({ error: "This Account Number is currently Inactive" });
    return res.status(200).json(acc.balance);
}

async function debitMoney(req,res){
        const { accountNumber, sortCode,Type, amount } = req.body;
    
        // Find the account associated with the business
        const acc = await Account.findOne({
            accountNumber: accountNumber,
            sortCode: sortCode,
            business: req.business._id // Ensure the account belongs to the authenticated business
        });
    
        // Check if account exists
        if (!acc) return res.status(400).json({ error: "This Account Number Doesn't Exist" });
    
        // Check if the account is active
        if (acc.status === "INACTIVE") return res.status(401).json({ error: "This Account Number is currently Inactive" });
    
        // Check if the account has sufficient balance for debit
        if ( acc.balance < amount) {
            return res.status(400).json({ error: "Insufficient balance" });
        }
    
        // Debit the amount from the balance
        acc.balance -= amount;
    
        // Save the updated account balance
        await acc.save();
    
        // Log the transaction
        const transaction = new Transaction({
            accountNumber: accountNumber,
            sortCode: sortCode,
            Type:"debit",
            amount: amount,
            // date: new Date(),
            // business: req.business._id
        });
        await transaction.save();
    
        // Respond with success message and updated balance
        return res.status(200).json({ message: "Debit successful", newBalance: acc.balance });
    }
    


async function creditMoney(req,res){
        const { accountNumber, sortCode,Type, amount } = req.body;
    
        // Find the account associated with the business
        const acc = await Account.findOne({
            accountNumber: accountNumber,
            sortCode: sortCode,
            business: req.business._id // Ensure the account belongs to the authenticated business
        });
    
        // Check if account exists
        if (!acc) return res.status(400).json({ error: "This Account Number Doesn't Exist" });
    
        // Check if the account is active
        if (acc.status === "INACTIVE") return res.status(401).json({ error: "This Account Number is currently Inactive" });
    
        // Check if the account allows credit transactions
        if (acc.allowCredit === false) {
            return res.status(401).json({ error: "This Account Number is not for crediting" });
        }
    
        // Credit the amount to the balance
        acc.balance += amount;
    
        // Save the updated account balance
        await acc.save();
    
        // Log the transaction
        const transaction = new Transaction({
            accountNumber: accountNumber,
            sortCode: sortCode,
            Type:"credit",
            amount: amount,
            // date: new Date(),
            // business: req.business._id
        });
        await transaction.save();
    
        // Respond with success message and updated balance
        return res.status(200).json({ message: "Credit successful", newBalance: acc.balance });
    }
     


module.exports={
    creditMoney,
    debitMoney,
    getBalance
}