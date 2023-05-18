/**
 * Created by Lin on 2017-12-26.
 */
const jwt=require('jsonwebtoken');
const testToken=function (token) {
  let result='';
  if(token){
    // 解码 token (验证 secret 和检查有效期（exp）)
    jwt.verify(token, 'secret', function(err, decoded) {
      if (err) {
        result={ success: false, message: '糟糕，你的认证已过期，请重新登录！' }
        //return result;  //token已过期
      } else {
        // 如果验证通过，在req中写入解密结果
        result={ success: true, message: 'token验证成功' }
        //return result;
      }
    });
  }else {
    // 没有拿到token 返回错误
    result={
      success: false,
      message: '没有找到token.'
    }
    //return result;
  }
  return result
}
module.exports={
  testToken:testToken
};
