/**
 * Created by Lin on 2017-11-10.
 */
const express=require('express');
const mongoose=require('mongoose');
const router = express.Router();
const crypto=require('crypto');
const jwt=require('jsonwebtoken');

router.post('/user',function (req,res) {
  const User = global.dbHandel.getModel('user');
  const uname = req.body.uname;//获取post上来的 data数据中 uname的值
  let md5 = crypto.createHash("md5");//加密
  let newPas = md5.update(req.body.upwd).digest("hex");
  User.findOne({phone:uname},function(err,doc){//通过此model以用户名的条件 查询数据库中的匹配信息
    if(err){ 										//错误就返回给原post处（login) 状态码为500的错误
      res.send(500);
      console.log(err);
    }else if(!doc){ 								//查询不到用户名匹配信息，则用户名不存在
      res.send(404,{error:'用户不存在'});
    }else{
      if(newPas != doc.password){ 	//查询到匹配用户名的信息，但相应的password属性不匹配
        res.send(404,{error:'密码错误'});
        //	res.redirect("/login");
      }else{
        //基于token处理
        let authToken = jwt.sign({name: uname}, "secret", {expiresIn : 60*60});
        res.status(200).json({
          token: authToken,
          name:doc.name,
          name_id:doc._id,
          img:doc.img
        });
        res.end();
      }
    }
  });
})

module.exports = router;
