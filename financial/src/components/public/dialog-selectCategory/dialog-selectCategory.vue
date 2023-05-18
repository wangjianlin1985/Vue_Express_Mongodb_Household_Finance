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
                categorys: ['食品酒水','衣服饰品','居家物业','行车交通','交流通讯','休闲娱乐','学习进修','人情来往','医疗保健','金融保险','其他杂项'],
                category_details:[
                  {
                    index:0,
                    category_content:'早午晚餐',
                    category_logo:'icon-zaocan'
                  },
                  {
                    index:0,
                    category_content:'烟酒茶',
                    category_logo:'icon-yanjiuchashui3'
                  },
                  {
                    index:0,
                    category_content:'水果零食',
                    category_logo:'icon-lingshi'
                  },
                  {
                    index:1,
                    category_content:'衣服裤子',
                    category_logo:'icon-yifu'
                  },
                  {
                    index:1,
                    category_content:'鞋帽包包',
                    category_logo:'icon-xiemaoxiangbao'
                  },
                  {
                    index:1,
                    category_content:'化妆饰品',
                    category_logo:'icon-e625'
                  },
                  {
                    index:2,
                    category_content:'日常用品',
                    category_logo:'icon-riyongpin'
                  },
                  {
                    index:2,
                    category_content:'水电煤气',
                    category_logo:'icon-shuidian'
                  },
                  {
                    index:2,
                    category_content:'房租',
                    category_logo:'icon-zufang'
                  },
                  {
                    index:2,
                    category_content:'物业管理',
                    category_logo:'icon-wuyeguanli'
                  },
                  {
                    index:2,
                    category_content:'维修保养',
                    category_logo:'icon-weixiu'
                  },
                  {
                    index:3,
                    category_content:'公共交通',
                    category_logo:'icon-gonggongjiaotong'
                  },
                  {
                    index:3,
                    category_content:'打车租车',
                    category_logo:'icon-chuzuche'
                  },
                  {
                    index:3,
                    category_content:'私家车',
                    category_logo:'icon-sijiache'
                  },
                  {
                    index:4,
                    category_content:'座机费',
                    category_logo:'icon-zuoji'
                  },
                  {
                    index:4,
                    category_content:'手机费',
                    category_logo:'icon-shouji'
                  },
                  {
                    index:4,
                    category_content:'上网费',
                    category_logo:'icon-shangwangliulan'
                  },
                  {
                    index:4,
                    category_content:'邮寄费',
                    category_logo:'icon-youjiguanli'
                  },
                  {
                    index:5,
                    category_content:'运动健身',
                    category_logo:'icon-yundong'
                  },
                  {
                    index:5,
                    category_content:'腐败聚会',
                    category_logo:'icon-juhui'
                  },
                  {
                    index:5,
                    category_content:'休闲玩乐',
                    category_logo:'icon-yule'
                  },
                  {
                    index:5,
                    category_content:'宠物宝贝',
                    category_logo:'icon-youpinwangtubiao-'
                  },
                  {
                    index:5,
                    category_content:'旅游度假',
                    category_logo:'icon-lvyou'
                  },
                  {
                    index:6,
                    category_content:'书报杂志',
                    category_logo:'icon-book'
                  },
                  {
                    index:6,
                    category_content:'培训进修',
                    category_logo:'icon-peixun-copy'
                  },
                  {
                    index:6,
                    category_content:'数码装备',
                    category_logo:'icon-shuma'
                  },
                  {
                    index:7,
                    category_content:'孝敬家长',
                    category_logo:'icon-jiaren'
                  },
                  {
                    index:7,
                    category_content:'送礼送客',
                    category_logo:'icon-handpackage'
                  },
                  {
                    index:7,
                    category_content:'还人钱物',
                    category_logo:'icon-huanqian'
                  },
                  {
                    index:7,
                    category_content:'慈善捐助',
                    category_logo:'icon-jifencishan'
                  },
                  {
                    index:8,
                    category_content:'药品费',
                    category_logo:'icon-yao'
                  },
                  {
                    index:8,
                    category_content:'保健费',
                    category_logo:'icon-baojian'
                  },
                  {
                    index:8,
                    category_content:'美容费',
                    category_logo:'icon-meirong'
                  },
                  {
                    index:8,
                    category_content:'治疗费',
                    category_logo:'icon-mianzhenzhiliao'
                  },
                  {
                    index:9,
                    category_content:'银行手续',
                    category_logo:'icon-yinxing'
                  },
                  {
                    index:9,
                    category_content:'投资亏损',
                    category_logo:'icon-kuisungongzi'
                  },
                  {
                    index:9,
                    category_content:'按揭还款',
                    category_logo:'icon-huankuan'
                  },
                  {
                    index:9,
                    category_content:'消费税收',
                    category_logo:'icon-shuishouxuanchuan'
                  },
                  {
                    index:9,
                    category_content:'利息支出',
                    category_logo:'icon-lixi'
                  },
                  {
                    index:9,
                    category_content:'赔偿罚款',
                    category_logo:'icon-fakuan'
                  },
                  {
                    index:10,
                    category_content:'其他支出',
                    category_logo:'icon-qita'
                  },
                  {
                    index:10,
                    category_content:'意外丢失',
                    category_logo:'icon-yiwai'
                  },
                  {
                    index:10,
                    category_content:'烂账损失',
                    category_logo:'icon-ccgl-fahuodansunyi-5'
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
  @import "css/dialog-selectCategory.css";
  @import "../../../assets/css/font-awesome.min.css";
  @import "../../../assets/css/swiper-3.4.2.min.css";
</style>
