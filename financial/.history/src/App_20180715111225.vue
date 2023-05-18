<template>
  <div id="app">
    <appheader></appheader>
    <router-view/>
    <appfooter v-show="$route.meta.isShow"></appfooter>
    <loading id="loading"></loading>
  </div>
</template>

<script>
import appheader from '../src/components/public/header/header.vue'
import loading from '../src/components/public/loading/loading.vue'
import appfooter from '../src/components/public/footer/footer.vue'
export default {
  name: 'app',
  components:{appheader,loading,appfooter},
  data() {
    return {
    }
  },
  beforeCreate:function () {

  },
  created:function () {
    
  },
  mounted:function () {
    if(document.all){
      console.log('你的浏览器太旧了，恕不奉陪')
    }
  },
  methods:{

  }
}
</script>

<style>
@import "//at.alicdn.com/t/font_519223_8gpp377k3sy06bt9.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  color: #2c3e50;
}
</style>
