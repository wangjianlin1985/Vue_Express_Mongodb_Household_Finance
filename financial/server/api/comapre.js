/**
 * Created by Lin on 2018-2-27.
 */
const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const testToken=require('./testToken');
const Spend = global.dbHandel.getModel('spend');
const Income=global.dbHandel.getModel('income');

router.get('/getCompare',function (req,res) {
  let now_date = req.query.now_date;
  let pre_date=req.query.pre_date;
  let user_id = req.query.user_id;
  let token = req.query.token;
  let result = testToken.testToken(token);
  let Account = {
    now_accountSp: 0,
    now_accountIn: 0,
    pre_accountSp:0,
    pre_accountIn:0
  };
  let promise = new Promise(function (resolve, reject) {
    if (result.success === true) {
      resolve();
    } else {
      reject();
    }
  }).then(function () {
    Spend.find({spendDate: {$regex: now_date}, user_id: user_id}, function (error, docs) {
      if (error) {
        res.send(500, {error: '查询失败'});
      } else {
        docs.forEach(function (value, index) {
          Account.now_accountSp += value.spendMoney;
        })
      }
    })
  }).then(function () {
    Spend.find({spendDate: {$regex: pre_date}, user_id: user_id}, function (error, docs) {
      if (error) {
        res.send(500, {error: '查询失败'});
      } else {
        docs.forEach(function (value, index) {
          Account.pre_accountSp += value.spendMoney;
        })
      }
    })
  }).then(function () {
    Income.find({incomeDate: {$regex: now_date}, user_id: user_id}, function (error, docs) {
      if (error) {
        res.send(500, {error: '查询失败'});
      } else {
        docs.forEach(function (value, index) {
          Account.now_accountIn += value.incomeMoney;
        })
      }
    })
  }).then(function () {
    Income.find({incomeDate: {$regex: pre_date}, user_id: user_id}, function (error, docs) {
      if (error) {
        res.send(500, {error: '查询失败'});
      } else {
        docs.forEach(function (value, index) {
          Account.pre_accountIn += value.incomeMoney;
        })
        res.send(200,{success:'成功',result:Account})
      }
    })
  }).catch(function () {
    res.send(500,{error:result});
  })
})
module.exports=router;
