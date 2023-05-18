/**
 * Created by Lin on 2017-11-20.
 */
const express=require('express');
const mongoose=require('mongoose');
const crypto=require('crypto');   //密码md5加密工具模块
const router=express.Router();

router.post('/register',function (req,res,next) {
  const User = global.dbHandel.getModel('user');
  let username=req.body.username;
  let password=req.body.password;
  let phone=req.body.phone;
  let md5 = crypto.createHash("md5");//加密
  let newPas = md5.update(password).digest("hex");
  User.findOne({phone:phone},function (err,doc) {
    if(err) {
      res.send(500,{error:'网络异常错误!'});
    }else if(doc){
      res.send(500,{error:'账号已经存在，请重新更改！'});
    }else {
      User.create({
        name:username,
        password:newPas,
        phone:phone,
        img:'static/user_pic/login-pic.jpg'
      },function (err,doc) {
        if(err){
          res.send(500,{error:'注册失败，请再检查输入信息！'});
        }else {
          res.send(200,{success:'注册成功！'});
        }
      })
    }
    })
})
module.exports = router;
