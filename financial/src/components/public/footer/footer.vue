<template>
  <div class="footer">
    <div class="logo">
      <ul>
        <li id="indexPage" class="clicked" v-on:click="goToHref($event)" location="index">
          <a>
            <div class="fa fa-home fa-2x"></div>
            <p>主页</p>
          </a>
        </li>
        <li id="incomePage" v-on:click="goToHref($event)" location="incomeList">
          <a>
            <div class="fa fa-dollar fa-2x"></div>
            <p>收入</p>
          </a>
        </li>
        <li id="spendPage" v-on:click="goToHref($event)" location="spendList">
          <a>
            <div class="fa fa-money fa-2x"></div>
            <p>消费</p>
          </a>
        </li>
        <li id="infoPage" v-on:click="goToHref($event)" location="info">
          <a>
            <div class="fa fa-user fa-2x"></div>
            <p>我的</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'appfooter',
        data () {
            return {
                msg: ''
            }
        },
        mounted:function (){
        },
        methods:{
            goToHref:function (e) {
              $(e.currentTarget).addClass('clicked');
              $(e.currentTarget).siblings().removeClass('clicked');
              location.href='/#/'+e.currentTarget.getAttribute('location');
            }
        }
    }
</script>

<style>
  @import "css/footer.css";
  @import "../../../assets/css/font-awesome.min.css";
</style>
