<template>
  <div class="editInfo">
    <p class="editInfo-title">头像</p>
    <div class="form-group">
      <input accept="image/*" name="img" id="upload_file" type="file" v-on:change="changeImg($event)">
      <img v-bind:src="ref_value" id="userImg">
    </div>
    <p class="editInfo-title">用户名</p>
    <div class="form-group">
      <i class="iconfont icon-yonghuming"></i>
      <input type="text" id="username" name="name" v-model:value="user_name" placeholder="请输入">
      <i class="fa fa-angle-right fa-2x"></i>
    </div>
    <p class="editInfo-title">修改密码</p>
    <div class="form-group">
      <i class="iconfont icon-mima"></i>
      <input type="password" id="password" name="password" v-model:value="password" placeholder="请输入原先密码">
      <i class="fa fa-angle-right fa-2x"></i>
    </div>
    <div class="form-group">
      <i class="iconfont icon-mima"></i>
      <input type="password" id="new_password" name="new_password" v-model:value="new_password" placeholder="请输入新的密码">
      <i class="fa fa-angle-right fa-2x"></i>
    </div>
    <div class="form-group">
      <i class="iconfont icon-mima"></i>
      <input type="password" id="re_password" name="re_password" v-model:value="re_password" placeholder="请再次输入密码">
      <i class="fa fa-angle-right fa-2x"></i>
    </div>

    <div id="submit" v-on:click="updateInfo()">完成</div>
    <dialogBox v-bind:message="error" v-bind:href="location" id="dialog"></dialogBox>
  </div>
</template>

<script>
    import dialogBox from '../public/dialog-box/dialog-box.vue'
    export default {
        name: '',
        data () {
            return {
              error:'',
              location:'',
              ref_value:sessionStorage.getItem('img'),
              user_name:sessionStorage.getItem('name'),
              password:'',
              new_password:'',
              re_password:''
            }
        },
        components:{dialogBox},
        mounted:function () {
          $('#dialog').hide();
        },
        methods: {
            changeImg:function (e) {
              let that=this;
              let file = e.target.files[0];
              let param = new FormData(); //创建form对象
              param.append('file',file,file.name);//通过append向form对象添加数据
              param.append('token',sessionStorage.getItem('token'));
              param.append('user_id',sessionStorage.getItem('id'));
              let config = {
                headers:{'Content-Type':'multipart/form-data'}
              };
              this.$ajax.post('/api/updateImg',param,config).then(response=>{
                that.ref_value=response.data.result;
                sessionStorage.setItem('img',response.data.result);
              }).catch(function (error) {
                that.error=error.response.data.error.message||error.response.data.error;
                that.location='/#/login'
                $('#dialog').show();
                $('#loading').hide();
              })
            },
            updateInfo:function () {
              let that=this;
              let param={
                  token:sessionStorage.getItem('token'),
                  user_id:sessionStorage.getItem('id'),
                  name:that.user_name,
                  password:that.password,
                  new_password:that.new_password,
                  re_password:that.re_password
              }
              if(param.name===''){
                  that.error='请输入用户名！';
                  $('#dialog').show();
                  return false;
              }else if(param.password===''||param.new_password===''||param.re_password===''){
                  that.error='请输入有效密码！';
                  $('#dialog').show();
                  return false;
              }else if(param.new_password!==param.re_password){
                  that.error='两次输入密码不一致！';
                  $('#dialog').show();
                  return false;
              }
              this.$ajax.post('/api/updateInfo',param).then(response=>{
                  sessionStorage.setItem('name',that.user_name);
                  that.error=response.data.success;
                  that.location='/#/login';
                  $('#dialog').show();
              }).catch(function (error) {
                  if(error.response.data.error){
                      that.error=error.response.data.error;
                      $('#dialog').show();
                  }else {
                    that.error=error.response.data.error.message;
                    that.location='/#/login'
                    $('#dialog').show();
                  }
                  $('#loading').hide();
              })
            }
        }
    }
</script>

<style>
  @import "css/editInfo.css";
  @import "../../assets/css/font-awesome.min.css";
</style>
