const mongoose=require('mongoose');

const accountSchema = new mongoose.Schema({
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true},
    accountNumber: { type: Number, required: true, unique: true, minlength: 10, maxlength: 10 },
    sortCode: { type: Number, required: true, minlength: 8, maxlength: 8 },
    status: { 
        type: String, 
        enum: ['ACTIVE', 'INACTIVE'], 
        default: 'ACTIVE' 
    },
    allowCredit: { type: Boolean, default: true }, // Allow credit transactions
    allowDebit: { type: Boolean, default: true }, 
    balance: { type: Number, default: 0 }, // Allow debit transactions
    createdAt: { type: Date, default: Date.now }
},
{
    timestamps:true,
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
// {
//     "business":"66fc04467751d94964899b60",
//     "accountNumber":2134236369,
//     "sortCode":232527,
//     "status":"ACTIVE",
//     "allowCredit":true,
//     "balance":4500
//   }