<template>
  <div class="backTop" v-on:click="top()">
    <i class="fa fa-angle-double-up fa-2x"></i>
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                msg: ''
            }
        },
        mounted:function () {
          $(window).scroll(function () {
            if($(window).scrollTop()>30){
              $('.backTop').show();
            }else if($(window).scrollTop()<=30){
              $('.backTop').hide();
            }
          })
        },
        methods: {
          top:function () {
            $('body,html').animate({ scrollTop: 0 }, 200);
          }
        }
    }
</script>

<style>
@import "css/backTop.css";
@import "../../../assets/css/font-awesome.min.css";
</style>
