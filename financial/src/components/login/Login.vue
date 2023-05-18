<template>
  <div class="login">
    <div class="login-back"></div>
    <div class="login-form">
      <div class="pic-logo">
        <img src="../../assets/login-pic.jpg">
      </div>
      <div class="login-content">
        <i class="fa fa-user-circle-o fa-2x"></i>
        <input type="number" name="user-id" id="userid" placeholder="请输入你的账号" v-model="name">
      </div>
      <div class="login-content">
        <i class="fa fa-lock fa-2x"></i>
        <input type="password" name="password" id="password" placeholder="请输入密码" v-model="password">
      </div>
      <div class="login-submit">
        <input id="submit" type="submit" name="submit" value="登 录" v-on:click="submit()">
      </div>
      <div class="other">
        <a href='/#/register'>还没账号？点击注册</a>
      </div>
    </div>
      <dialogBox v-bind:message="error" id="dialog"></dialogBox>
  </div>
</template>

<script>
    import $ from 'jquery'
    import dialogBox from '../public/dialog-box/dialog-box.vue'
    export default {
        name: 'Login',
        data () {
            return {
                name:'',
                password:'',
                error:''
            }
        },
      components:{dialogBox},
      mounted:function () {

        $('#dialog').hide();

      },
        methods:{
            submit:function () {
              let user=this.name;
              let password=this.password;
              let that=this;
              if(user===''){
                this.error='你还没输入用户账号！'
                $('#dialog').show();

              }else if(password===''){
                this.error='你还没输入密码！'
                $('#dialog').show();
                  return false;
              }else {
                this.$ajax.post('/api/user', {
                  uname: user,
                  upwd: password
                })
                  .then(function (response) {
                    sessionStorage.setItem('token',response.data.token);
                    sessionStorage.setItem('id',response.data.name_id);
                    sessionStorage.setItem('name',response.data.name);
                    sessionStorage.setItem('img',response.data.img);
                    location.href='/#/index';
                  })
                  .catch(function (error) {
                      if(error.response){
                        that.error=error.response.data.error;
                        $('#dialog').show();
                        $('#loading').hide();
                      }
                  });
              }
            }
        }
    }
</script>

<style>
  @import "../../assets/css/font-awesome.min.css";
  @import "css/login.css";
</style>
