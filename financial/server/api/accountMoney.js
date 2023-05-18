/**
 * Created by Lin on 2018-1-10.
 */
const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const testToken=require('./testToken');
const Spend = global.dbHandel.getModel('spend');
const Income=global.dbHandel.getModel('income');

router.get('/accountMoney',function (req,res) {
  let date=req.query.date;
  let user_id=req.query.user_id;
  let token=req.query.token;
  let result=testToken.testToken(token);
  let submitSpend={spendDate:date,user_id:user_id};
  let submitIncome={incomeDate:date,user_id:user_id};
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
        let item=0;
        docs.forEach(function (value, index) {
          item+=value.spendMoney;
        })
        returnAccount.accountSp=item;
        Income.find(submitIncome,function (error,docs) {
          if(error){
            res.send(500,{error:'查询失败'});
          }else {
            let item=0;
            docs.forEach(function (value,index) {
              item+=value.incomeMoney;
            })
            returnAccount.accountIn=item;
            res.send(200,{success:'成功',result:returnAccount})
          }
        })
      }
    })
  }).catch(function () {
    res.send(500,{error:result});
  })

})

router.get('/accountMonthMoney',function (req,res) {
  let date=req.query.date;
  let user_id=req.query.user_id;
  let token=req.query.token;
  let result=testToken.testToken(token);
  let submitSpend={spendDate:{$regex:date},user_id:user_id};
  let submitIncome={incomeDate:{$regex:date},user_id:user_id};
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

router.get('/accountSpend',function (req,res) {
  let date=req.query.date;
  let user_id=req.query.user_id;
  let token=req.query.token;
  let result=testToken.testToken(token);
  let resultAccount=0;
  let submitSpend={
    spendDate:{$regex:date},
    user_id:user_id
  };
  let spendMoneyJson={
    eating:0,
    closing:0,
    living:0,
    traffic:0,
    community:0,
    entertainment:0,
    study:0,
    human:0,
    medical:0,
    financial:0,
    other:0
  };
  function returnData(data,category) {
    for(let key in spendMoneyJson){
      if(key==category){
        spendMoneyJson[key]=data;
      }
    }
  }
  let categorys=['食品酒水','衣服饰品','居家物业','行车交通','交流通讯','休闲娱乐','学习进修','人情来往','医疗保健','金融保险','其他杂项'];
  let categorysJson=['eating', 'closing', 'living', 'traffic', 'community', 'entertainment', 'study', 'human', 'medical', 'financial', 'other']
  let promise=new Promise(function (resolve,reject) {
    if(result.success===true) {
      resolve();
    }else {
      reject();
    }
  }).then(function () {
    Spend.find(submitSpend, function (error, docs) {
      if(error){
        res.send(500,{error:'查询失败'});
      }else {
        docs.forEach(function (value,index) {
          resultAccount+=value.spendMoney;
          for(let i=0;i<categorys.length;i++){
            if(value.spendCategory.search(categorys[i])!==-1){
               let item=eval('spendMoneyJson.'+categorysJson[i]);
               item+=value.spendMoney;
               returnData(item,categorysJson[i]);
            }
          }
        })
        res.send(200,{success:'成功',result:{
          resultAccount:resultAccount,
          spendMoneyJson:spendMoneyJson
        }})
      }
    });
  }).catch(function () {
    res.send(500,{error:result});
  })
})

router.get('/accountIncome',function (req,res) {
  let date=req.query.date;
  let user_id=req.query.user_id;
  let token=req.query.token;
  let result=testToken.testToken(token);
  let resultAccount=0;
  let submitIncome={
    incomeDate:{$regex:date},
    user_id:user_id
  };
  let incomeMoneyJson={
    wage:0,
    interest:0,
    overtime:0,
    bonus:0,
    investment:0,
    parttime:0,
    gift:0,
    winning:0,
    accident:0,
    business:0
  };
  function returnData(data,category) {
    for(let key in incomeMoneyJson){
      if(key==category){
        incomeMoneyJson[key]=data;
      }
    }
  }
  let categorys=['工资收入','利息收入','加班收入','奖金收入','投资收入','兼职收入','礼金收入','中奖收入','意外来财','经营所得'];
  let categorysJson=['wage','interest','overtime','bonus','investment','parttime','gift','winning','accident','business']
  let promise=new Promise(function (resolve,reject) {
    if(result.success===true) {
      resolve();
    }else {
      reject();
    }
  }).then(function () {
    Income.find(submitIncome, function (error, docs) {
      if(error){
        res.send(500,{error:'查询失败'});
      }else {
        docs.forEach(function (value,index) {
          resultAccount+=value.incomeMoney;
          for(let i=0;i<categorys.length;i++){
            if(value.incomeCategory.search(categorys[i])!==-1){
              let item=eval('incomeMoneyJson.'+categorysJson[i]);
              item+=value.incomeMoney;
              returnData(item,categorysJson[i]);
            }
          }
        })
        res.send(200,{success:'成功',result:{
          resultAccount:resultAccount,
          incomeMoneyJson:incomeMoneyJson
        }})
      }
    });
  }).catch(function () {
    res.send(500,{error:result});
  })
})
module.exports=router;
