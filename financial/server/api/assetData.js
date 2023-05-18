/**
 * Created by Lin on 2018-3-1.
 */
const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const testToken=require('./testToken');
const Income = global.dbHandel.getModel('income');
const Spend = global.dbHandel.getModel('spend');

router.get('/assetSpendDate',function (req,res) {
  let date=req.query.date;
  let user_id=req.query.user_id;
  let token=req.query.token;
  let title=req.query.title;
  let result=testToken.testToken(token);
  let submit={spendDate:{$regex:date},user_id:user_id,spendAccount:{$regex:title}};
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
router.get('/assetIncomeDate',function (req,res) {
  let date=req.query.date;
  let user_id=req.query.user_id;
  let token=req.query.token;
  let title=req.query.title;
  let result=testToken.testToken(token);
  let submit={incomeDate:{$regex:date},user_id:user_id,incomeAccount:{$regex:title}};
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

router.get('/assetMonthMoney',function (req,res) {
  let date=req.query.date;
  let user_id=req.query.user_id;
  let token=req.query.token;
  let title=req.query.title;
  let result=testToken.testToken(token);
  let submitSpend={spendDate:{$regex:date},user_id:user_id,spendAccount:{$regex:title}};
  let submitIncome={incomeDate:{$regex:date},user_id:user_id,incomeAccount:{$regex:title}};
  let returnAccount={
    accountSp:0,
    accountIn:0
  };
  let promise=new Promise(function (resolve,reject) {
    if(result.success===true) {
      resolve();
    }else {
      reject();
    }
  }).then(function () {
    Spend.find(submitSpend, function (error, docs) {
      if (error) {
        res.send(500, {error: '查询失败'});
      } else {
        docs.forEach(function (value, index) {
          returnAccount.accountSp += value.spendMoney;
        })
        Income.find(submitIncome,function (error,docs) {
          if(error){
            res.send(500,{error:'查询失败'});
          }else {
            docs.forEach(function (value,index) {
              returnAccount.accountIn+=value.incomeMoney;
            })
            res.send(200,{success:'成功',result:returnAccount})
          }
        })
      }
    })
  }).catch(function () {
    res.send(500,{error:result});
  })

})

module.exports=router;
