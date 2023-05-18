<template>
  <div class="info">
    <div class="info-header-back"></div>
    <div class="info-header">
      <div class="info-header-img">
        <img v-bind:src="ref_value">
      </div>
      <div class="info-header-content">
        <h4>用户名：{{user_name}}</h4>
        <p><i class="iconfont icon-jinbi"></i>总资产：{{account}}元  <br>收入：{{income}}元&nbsp;&nbsp;&nbsp;支出：{{spend}}元</p>
      </div>
    </div>
    <div class="info-list">
      <ul>
        <li v-on:click="goTo('/#/editInfo')"><i class="iconfont icon-geren"></i>用户设置</li>
        <li v-on:click="goTo('/#/asset')"><i class="iconfont icon-zhangben"></i>资产汇总</li>
        <li style="color: tomato" v-on:click="logout()">退出登录</li>
        <li id="update"><input accept="image/*" name="img" id="upload_file" type="file" v-on:change="updateImg($event)">  </li>
      </ul>
    </div>
    <dialogBox v-bind:message="error" v-bind:href="location" id="dialog"></dialogBox>
    <dialogConfirm id="dialogConfirm" v-bind:option="selected_option" v-bind:logout_content="login_detail"></dialogConfirm>
  </div>
</template>

<script>
    import dialogBox from '../public/dialog-box/dialog-box.vue'
    import dialogConfirm from '../public/dialog-confirm/dialog-confirm.vue'
    export default {
        name: '',
        data () {
            return {
                error:'',
                location:'',
                account:0,
                spend:0,
                income:0,
                ref_value:sessionStorage.getItem('img'),
                user_name:sessionStorage.getItem('name'),
                selected_option:'logout',
                login_detail:'你确定退出登陆吗？'
            }
        },
        mounted:function () {
          $('#dialog').hide();
          $('#dialogConfirm').hide();
          $('.info-header-back').css({'background-image':'url("'+this.ref_value+'")'});
          this.getAccount();

          $('#infoPage').addClass('clicked');
          $('#infoPage').siblings().removeClass('clicked');
        },
        components:{dialogBox,dialogConfirm},
        methods:{
            updateImg:function (e) {
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
                  $('.info-header-back').css({'background-image':'url("'+response.data.result+'")'});
                }).catch(function (error) {
                that.error=error.response.data.error.message||error.response.data.error;
                that.location='/#/login'
                $('#dialog').show();
                $('#loading').hide();
              })
            },
            getAccount:function () {
              let that=this;
              this.$ajax.get('/api/accountMonthMoney',{
                  params:{
                    token:sessionStorage.getItem('token'),
                    user_id:sessionStorage.getItem('id'),
                    date:''
                  }
              }).then(function (response) {
                that.spend=response.data.result.accountSp;
                that.income=response.data.result.accountIn;
                that.account=(response.data.result.accountIn-response.data.result.accountSp).toFixed(2);
              }).catch(function (error) {
                that.error=error.response.data.error.message||error.response.data.error;
                that.location='/#/login'
                $('#dialog').show();
                $('#loading').hide();
              })
            },
            goTo:function (url) {
              location.href=url;
            },
            logout:function () {
              $('#dialogConfirm').show();
            }
        }
    }
</script>

<style>
  @import "css/info.css";
</style>
