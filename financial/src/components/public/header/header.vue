<template>
  <div class="header">
    <i class="fa fa-angle-left fa-2x" id="back" v-on:click="goToback()"></i>
    <p>{{msg}}</p>
    <p id="auth" class="fa fa-user"></p>
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                msg: '个人家庭财务系统'
            }
        },
        mounted:function () {

        },
        methods:{
            goToback:function () {
              javascript:history.back(-1);
            }
        }
    }
</script>

<style>
  @import "css/header.css";
  @import "../../../assets/css/font-awesome.min.css";
</style>
