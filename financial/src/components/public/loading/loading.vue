<template>
  <div class="loading">
    <div class="loading-content">
      <i class="fa fa-spinner fa-spin fa-4x fa-fw"></i>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                msg: ''
            }
        }
    }
</script>

<style>
@import "css/loading.css";
@import "../../../assets/css/font-awesome.min.css";
</style>
