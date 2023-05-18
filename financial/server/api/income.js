/**
 * Created by Lin on 2018-1-1.
 */
const express=require('express');
const router = express.Router();

const testToken=require('./testToken.js');// token验证功能，封装成一个公共方法testToken()

router.post('/incomeMoney',function (req,res) {
  const Income = global.dbHandel.getModel('income');
  let user_id = req.body.user_id;
  let incomeMoney=req.body.incomeMoney;
  let incomeCategory=req.body.incomeCategory;
  let incomeAccount=req.body.incomeAccount;
  let incomeDate=req.body.incomeDate;
  let incomeTime=req.body.incomeTime;
  let recordTime=new Date(incomeDate + ' ' + incomeTime);
  let description=req.body.description;
  let category_logo=req.body.category_logo;
  let account_logo=req.body.account_logo;
  const token=req.body.token;
  let submit={
    user_id:user_id,
    incomeMoney:incomeMoney,
    incomeCategory:incomeCategory,
    incomeAccount:incomeAccount,
    incomeDate:incomeDate,
    incomeTime:incomeTime,
    recordTime:recordTime,
    description:description,
    category_logo:category_logo,
    account_logo:account_logo
  }
  let result=testToken.testToken(token);
  if(result.success===true){
    console.log(recordTime);
    Income.create(submit,function (err,doc) {
      if(err){
        console.log(err);
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
