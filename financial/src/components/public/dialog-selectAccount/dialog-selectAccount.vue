<template>
  <div class="selectAccount">
    <div class="accountDialog">
      <div class="selectAccount-header">
        <i class="close fa fa-close fa-2x" v-on:click="close()"></i>
      </div>
      <div class="selectAccount-content">
        <div class="selectAccount-option">
          <div class="swiper-container" id="account">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="account in accounts">
                {{account}}
                <div class="hr"></div>
              </div>
            </div>
          </div>
          <div class="swiper-container" id="account_detail">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="account_detail in account_details" v-bind:index="account_detail.index">
                <i class="iconfont" v-bind:class="account_detail.account_logo"></i>&nbsp;<span>{{account_detail.account_content}}</span>
                <div class="hr"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="selectAccount-footer">
          <div class="cancel" v-on:click="close()"><p>取消</p></div>
          <div class="confirm" v-on:click="confirm()"><p>确定</p></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Swiper from 'swiper'
    export default {
        name: '',
        data () {
            return {
               accounts:['现金账户','信用卡','金融账户','虚拟账户','负债账户','债权账户','投资账户'],
               account_details:[
                 {
                     index:0,
                     account_content:'现金',
                     account_logo:'icon-xianjin'
                 },
                 {
                   index:1,
                   account_content:'信用卡',
                   account_logo:'icon-xinyongqia'
                 },
                 {
                   index:2,
                   account_content:'银行卡',
                   account_logo:'icon-yinxingqia'
                 },
                 {
                   index:3,
                   account_content:'饭卡',
                   account_logo:'icon-fanqia2'
                 },
                 {
                   index:3,
                   account_content:'支付宝',
                   account_logo:'icon-page1'
                 },
                 {
                   index:3,
                   account_content:'公交卡',
                   account_logo:'icon-gongjiaoqia'
                 },
                 {
                   index:4,
                   account_content:'应付款项',
                   account_logo:'icon-xiangmuguanli_yingshouzhangkuan'
                 },
                 {
                   index:5,
                   account_content:'应收款项',
                   account_logo:'icon-yingshoukuanxiang'
                 },
                 {
                   index:5,
                   account_content:'公司报销',
                   account_logo:'icon-baoxiao'
                 },
                 {
                   index:6,
                   account_content:'基金用户',
                   account_logo:'icon-jijin'
                 },
                 {
                   index:6,
                   account_content:'余额宝',
                   account_logo:'icon-yuebao'
                 },
                 {
                   index:6,
                   account_content:'股票账户',
                   account_logo:'icon-gupiao-copy'
                 }

               ]
            }
        },
        mounted:function () {
          let that=this;
          let all=this.account_details;
          let detailSwiper=new Swiper('#account_detail',{
            direction: 'vertical',
            slidesPerView :5,
            centeredSlides:true,
            initialSlide:0,
            observer:true
          });
          let accountSwiper=new Swiper('#account',{
            direction: 'vertical',
            slidesPerView :5,
            centeredSlides:true,
            initialSlide:0,
            on:{
              slideChangeTransitionEnd:function () {
                let index=this.activeIndex;
                let result=new Array();
                for(let i=0;i<all.length;i++){
                  if(all[i].index===index){
                    result.push(all[i]);
                  }
                }
                that.account_details=result;
              }
            }
          });
        },
        methods:{
          close:function () {
            $('.selectAccount').hide();
          },
          confirm:function () {
            let account=$('#account .swiper-slide-active').text().trim();
            let account_detail=$('#account_detail .swiper-slide-active').text().trim();
            let logoClass=$('#account_detail .swiper-slide-active i').attr('class');
            let result='<i class="'+logoClass+'"></i><p>'+account+'&gt;'+account_detail+'</p>';
            this.$emit('resultAccount',result);
            $('.selectAccount').hide();
          }
        }
    }
</script>

<style>
  @import "css/dialog-selectAccount.css";
  @import "../../../assets/css/swiper-3.4.2.min.css";
</style>
