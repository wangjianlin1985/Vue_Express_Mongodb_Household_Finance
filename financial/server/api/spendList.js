/**
 * Created by Lin on 2017-12-26.
 */
const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const testToken=require('./testToken');

router.get('/spendList',function (req,res) {
  const Spend = global.dbHandel.getModel('spend');
  let date=req.query.date;
  let user_id=req.query.user_id;
  let token=req.query.token;
  let result=testToken.testToken(token);
  let submit={spendDate:date,user_id:user_id};
  if(result.success===true) {
    Spend.find(submit,null, {sort: {'recordTime': -1},limit:parseInt(req.query.limit),skip:parseInt(req.query.start)},function (err,docs) {
      if(err){
        res.send(500,{error:'查询失败'});
      }else {
        let resultArray=new Array();
        docs.forEach(function (value,index) {
          let result={
            _id:value._id,
            user_id:value.user_id,
            account_logo:value.account_logo,
            category_logo:value.category_logo,
            account:value.spendAccount,
            category:value.spendCategory,
            date:value.spendDate,
            time:value.spendTime,
            money:value.spendMoney,
            description:value.description
          };
          resultArray.push(result);
        })

        res.send(200,{success:'查询成功！',result:resultArray});
      }
    })
  }else {
    res.send(500,{error:result});
  }

})

module.exports=router;
