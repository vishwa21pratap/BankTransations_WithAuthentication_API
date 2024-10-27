const mongoose=require('mongoose');

const businessSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    accounts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account',
    }]

},{
    timestamps:true,
});
const Business=mongoose.model('Business',businessSchema);

module.exports=Business;
