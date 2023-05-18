<template>
  <div class="dialog-confirm">
    <div class="dialog-confirm-content">
      <div class="dialog-confirm-header">提示</div>
      <div class="dialog-confirm-center"><p>{{msg}}</p></div>
      <div class="dialog-confirm-bottom">
        <div id="cancel" v-on:click="close()">取消</div>
        <div id="confirm" v-on:click="confirm()">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                msg: '你确定删除这条信息吗？',
                error:''
            }
        },
      mounted:function () {
            this.msg=this.logout_content;
      },
        methods: {
          close:function () {
            $('.dialog-confirm').hide();
          },
          confirm:function () {
            let that=this;
            if(this.option=='.list-option-spend'){
              this.$ajax.post('/api/delSpend', {     //删除支出的接口
                    _id:this._id,
                    token:sessionStorage.getItem('token')
                }).then(function (response) {
                $('.dialog-confirm').hide();
                that.$emit('returnLoad',{state:true,option:'spend'});    //用于传递参数给父组件进行局部刷新
              }).catch(function (error) {
                if(error.response){
                  that.error=error.response.data.error.message||error.response.data.error;
                  $('#loading').hide();
                  that.$emit('returnState',{state:true,error:that.error});
                }
              })
            }else if(this.option=='.list-option-income') {
              this.$ajax.post('/api/delIncome', {    //删除收入的接口
                _id:this._id,
                token:sessionStorage.getItem('token')
              }).then(function (response) {
                $('.dialog-confirm').hide();
                that.$emit('returnLoad',{state:true,option:'income'});
              }).catch(function (error) {
                if(error.response){
                  that.error=error.response.data.error.message||error.response.data.error;
                  $('#loading').hide();
                  that.$emit('returnState',{state:true,error:that.error});
                }
              })
            }else {
              sessionStorage.removeItem('id');
              sessionStorage.removeItem('img');
              sessionStorage.removeItem('name');
              sessionStorage.removeItem('token');
              location.href='/#/login';
              $('#dialogConfirm').hide();
            }
          }
        },
        props:["_id","option","logout_content"]
    }
</script>

<style>
  @import "css/dialog-confirm.css";
</style>
