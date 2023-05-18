/**
 * Created by Lin on 2017-12-25.
 */
const express=require('express');
const router = express.Router();

const testToken=require('./testToken.js');// token验证功能，封装成一个公共方法testToken()

router.post('/spendMoney',function (req,res,next) {
  const Spend = global.dbHandel.getModel('spend');
  let user_id = req.body.user_id;
  let spendMoney=req.body.spendMoney;
  let spendCategory=req.body.spendCategory;
  let spendAccount=req.body.spendAccount;
  let spendDate=req.body.spendDate;
  let spendTime=req.body.spendTime;
  let recordTime=new Date(spendDate+' '+spendTime);
  let description=req.body.description;
  let category_logo=req.body.category_logo;
  let account_logo=req.body.account_logo;
  const token=req.body.token;
  let submit={
    user_id:user_id,
    spendMoney:spendMoney,
    spendCategory:spendCategory,
    spendAccount:spendAccount,
    spendDate:spendDate,
    spendTime:spendTime,
    recordTime:recordTime,
    description:description,
    category_logo:category_logo,
    account_logo:account_logo
  }

  let result=testToken.testToken(token);
  if(result.success===true){
    Spend.create(submit,function (err,doc) {
      if(err){
        res.send(500,{error:'添加失败'});
      }else{
        res.send(200,{success:'添加成功！'});
      }
    })
  }else {
    res.send(500,{error:result});
  }
})

module.exports = router;
