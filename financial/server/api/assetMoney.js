/**
 * Created by Lin on 2018-2-26.
 */
const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const testToken=require('./testToken');
const Spend = global.dbHandel.getModel('spend');
const Income=global.dbHandel.getModel('income');

router.get('/assetMoney',function (req,res) {
  let user_id=req.query.user_id;
  let token=req.query.token;
  let submit={user_id:user_id};
  let result=testToken.testToken(token);
  let assetMoneyJson={
    cash:{spend:0, income:0},
    creditCard:{spend:0, income:0},
    bankCard:{spend:0, income:0},
    mealCard:{spend:0, income:0},
    aliPay:{spend:0, income:0},
    busCard:{spend:0, income:0},
    payable:{spend:0, income:0},
    receivable:{spend:0, income:0},
    reimbursement:{spend:0, income:0},
    fund:{spend:0, income:0},
    aliTreasure:{spend:0, income:0},
    stock:{spend:0, income:0
    }
  }
  let categorys=['现金','信用卡','银行卡','饭卡','支付宝','公交卡','应付款项','应收款项','公司报销','基金用户','余额宝','股票账户'];
  let categorysJson=['cash','creditCard','bankCard','mealCard','aliPay','busCard','payable','receivable','reimbursement','fund','aliTreasure','stock'];
  function returnData(data,option,category) {
    for(let key in assetMoneyJson){
      if(key==category){
        (assetMoneyJson[key])[option]=data;
      }
    }
  }
  let promise=new Promise(function (resolve,reject) {
    if(result.success===true) {
      resolve();
    }else {
      reject();
    }
  }).then(function () {
    Spend.find(submit, function (error, docs) {
      if(error){
        res.send(500,{error:'查询失败'});
      }else {
        docs.forEach(function (value,index) {
          for(let i=0;i<categorys.length;i++){
            if(value.spendAccount.search(categorys[i])!==-1){
              let item=eval('assetMoneyJson.'+categorysJson[i]+'.spend');
              item+=value.spendMoney;
              returnData(item,'spend',categorysJson[i]);
            }
          }
        })
        Income.find(submit, function (error, docs) {
          if(error){
            res.send(500,{error:'查询失败'});
          }else {
            docs.forEach(function (value,index) {
              for(let i=0;i<categorys.length;i++){
                if(value.incomeAccount.search(categorys[i])!==-1){
                  let item=eval('assetMoneyJson.'+categorysJson[i]+'.income');
                  item+=value.incomeMoney;
                  returnData(item,'income',categorysJson[i]);
                }
              }
            })
            res.send(200,{success:'成功',result:{
              assetMoneyJson:assetMoneyJson
            }})
          }
        });
      }
    });
  }).catch(function () {
    res.send(500,{error:result});
  })
})

module.exports=router;
