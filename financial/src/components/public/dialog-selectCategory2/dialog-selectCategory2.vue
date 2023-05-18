<template>
  <div class="selectCategory">
    <div class="categoryDialog">
      <div class="selectCategory-header">
        <i class="close fa fa-close fa-2x" v-on:click="close()"></i>
      </div>
      <div class="selectCategory-content">
        <div class="selectCategory-option">
          <div class="swiper-container" id="category">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="category in categorys">
                {{category}}
                <div class="hr"></div>
              </div>
            </div>
          </div>
          <div class="swiper-container" id="category_detail">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="category_detail in category_details" v-bind:index="category_detail.index">
                <i class="iconfont" v-bind:class="category_detail.category_logo"></i>&nbsp;<span>{{category_detail.category_content}}</span>
                <div class="hr"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="selectCategory-footer">
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
        categorys: ['职业收入','其他收入'],
        category_details:[
          {
            index:0,
            category_content:'工资收入',
            category_logo:'icon-gongzi'
          },{
            index:0,
            category_content:'利息收入',
            category_logo:'icon-zhanghuxinxililv'
          },{
            index:0,
            category_content:'加班收入',
            category_logo:'icon-jiaban'
          },{
            index:0,
            category_content:'奖金收入',
            category_logo:'icon-jiangjin'
          },{
            index:0,
            category_content:'投资收入',
            category_logo:'icon-icon'
          },{
            index:0,
            category_content:'兼职收入',
            category_logo:'icon-jianzhi'
          },{
            index:1,
            category_content:'礼金收入',
            category_logo:'icon-lijinqia2'
          },{
            index:1,
            category_content:'中奖收入',
            category_logo:'icon-zhongjiang'
          },{
            index:1,
            category_content:'意外来财',
            category_logo:'icon-shouyintai-richangshouzhi-shouru-yiwaishouru'
          },{
            index:1,
            category_content:'经营所得',
            category_logo:'icon-Management'
          }

        ]
      }
    },
    mounted:function () {
      let that=this;
      let all=this.category_details;
      let detailSwiper=new Swiper('#category_detail',{
        direction: 'vertical',
        slidesPerView :5,
        centeredSlides:true,
        initialSlide:0,
        observer:true
      })
      let categorySwiper=new Swiper('#category',{
        direction: 'vertical',
        slidesPerView :5,
        centeredSlides:true,
        initialSlide:0,
        on:{
          init:function () {
          },
          slideChangeTransitionEnd:function () {
            let index=this.activeIndex;
            //$('#category_detail').find('.swiper-slide[index='+"'"+index+"'"+']').show();
            //$('#category_detail').find('.swiper-slide:not([index='+"'"+index+"'"+'])').hide();
            let result=new Array();
            for(let i=0;i<all.length;i++){
              if(all[i].index===index){
                result.push(all[i]);
              }
            }
            that.category_details=result;
          }
        }
      })
    },
    methods:{
      close:function () {
        $('.selectCategory').hide();
      },
      confirm:function () {
        let category=$('#category .swiper-slide-active').text().trim();
        let category_detail=$('#category_detail .swiper-slide-active').text().trim();
        let logoClass=$('#category_detail .swiper-slide-active i').attr('class');
        let result='<i class="'+logoClass+'"></i><p>'+category+'&gt;'+category_detail+'</p>';
        this.$emit('resultCategory',result);
        $('.selectCategory').hide();
      }
    }
  }
</script>

<style>
  @import "css/dialog-selectCategory2.css";
  @import "../../../assets/css/font-awesome.min.css";
  @import "../../../assets/css/swiper-3.4.2.min.css";
</style>

</style>
