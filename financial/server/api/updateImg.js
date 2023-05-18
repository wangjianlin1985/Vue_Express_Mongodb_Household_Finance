/**
 * Created by Lin on 2018-2-23.
 */
const express=require('express');
const router=express.Router();
const testToken=require('./testToken');
const formidable=require('formidable');
const fs=require('fs');

router.post('/updateImg',function (req,res) {
  const User = global.dbHandel.getModel('user');
  //formidable处理头像
  let userDirPath ='static/user_pic';
  if (!fs.existsSync(userDirPath)) {
    fs.mkdirSync(userDirPath);
  }
  let form = new formidable.IncomingForm(); //创建上传表单
  form.encoding = 'utf-8'; //设置编辑
  form.uploadDir = userDirPath; //设置上传目录
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
  form.type = true;
  form.parse(req, function(err, fields, files) {
    if (err) {
      res.send(err);
      return;
    }
    let result=testToken.testToken(fields.token);
    let promise=new Promise(function (resolve,reject) {
      if(result.success===true) {
        resolve();
      }else {
        reject();
      }
    }).then(function () {
      let extName = ''; //后缀名
      switch (files.file.type) {
        case 'image/pjpeg':
          extName = 'jpg';
          break;
        case 'image/jpeg':
          extName = 'jpg';
          break;
        case 'image/png':
          extName = 'png';
          break;
        case 'image/x-png':
          extName = 'png';
          break;
      }
      if (extName.length === 0) {
        res.send(500,{
          error: '只支持png和jpg格式图片'
        });
        return;
      } else {
        var avatarName = '/' + fields.user_id +'_'+Date.now()+'.' + extName;
        var newPath = form.uploadDir + avatarName;
        fs.renameSync(files.file.path, newPath); //重命名
        User.findOne({_id:fields.user_id},function (err,doc) {
          if(err) {
            res.send(500,{error:'网络异常错误!'});
          }else{
            if(doc.img!=='static/user_pic/login-pic.jpg'){
              fs.unlink(doc.img,function (isError) {
                if(isError){
                  console.log('错误');
                }
              })
            }
          }
        })
        User.update({_id:fields.user_id},{$set:{img:newPath}},function (err,doc) {
          if(err) {
            res.send(500,{error:'网络异常错误!'});
          }else{
            res.send(200,{
              success:'成功',
              result:newPath
            });
          }
        })
      }
    }).catch(function () {
      res.send(500,{error:result});
    })
  });

})

module.exports=router;
