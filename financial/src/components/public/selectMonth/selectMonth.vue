<template>
<div class="selectMonth">
  <div id="beforeMonth" v-on:click="beforeMonth()">上一个月</div>
  <div id="afterMonth" v-on:click="afterMonth()">下一个月</div>
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
        methods:{
            beforeMonth:function () {
              this.$emit('resultDate',1);
            },
            afterMonth:function () {
              this.$emit('resultDate',0);
            }
        }
    }
</script>

<style>
@import "css/selectMonth.css";
</style>
