/**
 * Created by Lin on 2018-2-22.
 */
const express=require('express');
const router=express.Router();
const testToken=require('./testToken');
const Income = global.dbHandel.getModel('income');

router.get('/incomeCategory',function (req,res) {
  let date=req.query.date;
  let user_id=req.query.user_id;
  let token=req.query.token;
  let result=testToken.testToken(token);
  let resultAccount=0;
  let submitIncome={
    incomeDate:{$regex:date},
    user_id:user_id
  };
  let promise=new Promise(function (resolve,reject) {
    if(result.success===true) {
      resolve();
    }else {
      reject();
    }
  }).then(function () {
    Income.find(submitIncome,null, {sort: {'recordTime': -1},limit:3}, function (error, docs) {
      if(error){
        res.send(500,{error:'查询失败'});
      }else {
        res.send(200, {success: '成功', result: docs})
      }
    })
  }).catch(function () {
    res.send(500,{error:result});
  })
});

router.get('/incomeEachCategory',function (req,res) {
  let date=req.query.date;
  let user_id=req.query.user_id;
  let token=req.query.token;
  let incomeCategory=req.query.incomeCategory;
  let result=testToken.testToken(token);
  let submitIncome={
    incomeDate:{$regex:date},
    user_id:user_id,
    incomeCategory:{$regex:incomeCategory}
  };

  let promise=new Promise(function (resolve,reject) {
    if(result.success===true) {
      resolve();
    }else {
      reject();
    }
  }).then(function () {
    Income.find(submitIncome,null, {sort: {'_id': -1},limit:parseInt(req.query.limit),skip:parseInt(req.query.start)},function (err,docs) {
      if(err){
        res.send(500,{error:'查询失败'});
      }else {
        res.send(200,{success:'查询成功！',result:docs});
      }
    })
  }).catch(function () {
    res.send(500,{error:result});
  })
})

module.exports=router;
