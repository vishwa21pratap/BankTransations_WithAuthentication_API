const mongoose=require('mongoose');
const transactionSchema=mongoose.Schema({
    accountNumber: { type: Number, required: true, minlength: 10, maxlength: 10 },
    sortCode: { type: Number, required: true, minlength: 8, maxlength: 8 },
    Type:{
        type:String,
        required:true,

    },
    amount:{
        type: Number, 
        required: true,
    }
},{
    timestamps:true,
})
const Transaction=mongoose.model('Transaction',transactionSchema);
module.exports=Transaction;