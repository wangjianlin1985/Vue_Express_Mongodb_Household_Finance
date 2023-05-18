var mongoose=require('mongoose');
module.exports = {
	user:{
		name:{type:String,required:true},
    phone:{type:Number,required:true},
		password:{type:String,required:true},
    img:{type:String}
	},
  spend:{
    user_id:{type: mongoose.Schema.Types.ObjectId,required:true},
    spendMoney:{type:Number,required:true},
    spendCategory:{type:String,required:true},
    spendAccount:{type:String,required:true},
    spendDate:{type:String,required:true},
    spendTime:{type:String,required:true},
    recordTime:{type:Date,required:true},
    description:{type:String,required:false},
    category_logo:{type:String,required:true},
    account_logo:{type:String,required:true}
  },
  income:{
	  user_id:{type:mongoose.Schema.Types.ObjectId,required:true},
    incomeMoney:{type:Number,required:true},
    incomeCategory:{type:String,required:true},
    incomeAccount:{type:String,required:true},
    incomeDate:{type:String,required:true},
    incomeTime:{type:String,required:true},
    recordTime:{type:Date,required:true},
    description:{type:String,required:false},
    category_logo:{type:String,required:true},
    account_logo:{type:String,required:true}
  }
};
