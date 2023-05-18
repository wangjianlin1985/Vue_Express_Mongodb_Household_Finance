<template>
  <div class="dialog">
    <div class="dialog-box">
      <div class="dialog-header">
        <h3 class="dialog-header-content">信息提示！</h3>
      </div>
      <p class="dialog-content">{{message}}</p>
      <div class="dialog-submit" v-on:click="confirm()">
        <p>确定</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'dialog-box',
      data () {
        return {
          msg: ''
        }
      },
      props: ["message", "href"],
      methods: {
        confirm: function () {
          $('#dialog').hide();
          if (this.href === '/#/login' || this.href === '/#/index') {
            location.href = this.href;
          }
        }
      }
    }
</script>

<style>
@import "css/dialog-box.css";
</style>
