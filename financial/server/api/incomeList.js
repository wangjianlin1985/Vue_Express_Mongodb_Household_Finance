/**
 * Created by Lin on 2018-1-2.
 */
const express=require('express');
const router=express.Router();
const testToken=require('./testToken');

router.get('/incomeList',function (req,res) {
  const Income = global.dbHandel.getModel('income');
  let date=req.query.date;
  let user_id=req.query.user_id;
  let token=req.query.token;
  let result=testToken.testToken(token);
  let submit={incomeDate:date,user_id:user_id};
  if(result.success===true) {
    Income.find(submit,null, {sort: {'recordTime': -1},limit:parseInt(req.query.limit),skip:parseInt(req.query.start)},function (err,docs) {
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
            account:value.incomeAccount,
            category:value.incomeCategory,
            date:value.incomeDate,
            time:value.incomeTime,
            money:value.incomeMoney,
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
