/**
 * Created by Lin on 2018-2-28.
 */
const express=require('express');
const mongoose=require('mongoose');
const crypto=require('crypto');   //密码md5加密工具模块
const router=express.Router();
const testToken=require('./testToken');
const User = global.dbHandel.getModel('user');
router.post('/updateInfo',function (req,res) {
  let user_id=req.body.user_id;
  let token=req.body.token;
  let name=req.body.name;
  let password=req.body.password;
  let new_password=req.body.new_password;
  let md5 = crypto.createHash("md5");//加密
  let newPas = md5.update(new_password).digest("hex");
  let submit={
    _id:user_id,
    name:name,
    password:newPas
  };
  let result=testToken.testToken(token);
  let promise=new Promise(function (resolve,reject) {
    if(result.success===true) {
      resolve();
    }else {
      reject();
    }
  }).then(function () {
    let md5 = crypto.createHash("md5");//加密
    let pas = md5.update(password).digest("hex");
    User.findOne({_id:user_id},function (err,docs) {
      if(err){
        res.send(500,{error:'网络异常错误!'});
      }else if(docs.password!==pas){
        res.send(500,{error:'初始密码错误!'});
      }else {
        User.update({_id:user_id},{$set:submit},function (error,doc) {
          if(error) {
            res.send(500,{error:'网络异常错误!'});
          }else{
            res.send({success:"个人信息更改成功"});
          }
        })
      }
    })
  }).catch(function () {
    res.send(500,{error:result});
  })
})

module.exports=router;
