<template>
  <div class="selectDate">
    <div class="dateDialog">
      <div class="selectDate-header">
        <i class="close fa fa-close fa-2x" v-on:click="close()"></i>
      </div>
      <div class="selectDate-content">
        <div class="date-title">
          <h3>年</h3>
          <h3>月</h3>
          <h3>日</h3>
        </div>
        <div class="selectDate-option">
          <div class="swiper-container" id="year">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="year in years">
                {{year}}
                <div class="hr"></div>
              </div>
            </div>
          </div>
          <div class="swiper-container" id="month">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="month in months">
                {{month}}
                <div class="hr"></div>
              </div>
            </div>
          </div>
          <div class="swiper-container" id="day">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="day in days">
                {{day}}
                <div class="hr"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="selectDate-footer">
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
                msg: '',
                years:[],
                months:[1,2,3,4,5,6,7,8,9,10,11,12],
                days:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            }
        },
        created:function () {
          let preYear=new Array();
          for(let i=0;i<10;i++){
            let year=new Date().getFullYear()-i;
            preYear.push(year);
          }
          preYear.sort();
          this.years=preYear;
        },
        mounted:function(){
              let that=this;
              let yearSwiper = new Swiper ('#year', {
                direction: 'vertical',
                slidesPerView :5,
                centeredSlides:true,
                initialSlide:this.years.indexOf(new Date().getFullYear()),
                on:{
                    slideChangeTransitionEnd:function () {
                      let index=this.activeIndex;
                      let year=that.years[index];
                      if($('#month').find('.swiper-slide-active').text().trim()=='2'){
                          if(year%4===0&&year%100!==0){
                            that.days=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
                          }else {
                            that.days=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
                          }
                      }
                    }
                }
              });

              let monthSwiper=new Swiper('#month',{
                direction: 'vertical',
                slidesPerView :5,
                centeredSlides:true,
                initialSlide:this.months.indexOf(new Date().getMonth()+1),
                on:{
                    slideChangeTransitionEnd:function () {
                      let nowYear=parseInt($('#year').find('.swiper-slide-active').text().trim());
                      let index=this.activeIndex;
                      let month=that.months[index];
                      if(month===11||month===9||month===4||month===6){
                        that.days=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
                      }else if(month===1||month===3||month===5||month===7||month===8||month===10||month===12){
                        that.days=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
                      }else if(month===2){
                        if(nowYear%4===0&&nowYear%100!==0){
                          that.days=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
                        }else {
                          that.days=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
                        }
                      }
                    }
                }
              })
             let text=$('#month').find('.swiper-slide-active').text().trim();
             let selectYear=parseInt($('#year').find('.swiper-slide-active').text().trim());
             if(text==='11'||text==='4'||text==='6'||text==='9'){
               that.days=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
             }else if(text==='1'||text==='3'||text==='5'||text==='7'||text==='8'||text==='10'||text==='12'){
               that.days=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
             }else if(text==='2'){
                 if(selectYear%4===0&&selectYear%100!==0){
                   that.days=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
                 }else {
                   that.days=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
                 }
             }

             let daySwiper=new Swiper('#day',{
               direction: 'vertical',
               slidesPerView :5,
               centeredSlides:true,
               initialSlide:this.days.indexOf(new Date().getDate()),
               observer:true
             })

      },
      methods: {
        close:function () {
          $('.selectDate').hide();
        },
        confirm:function () {
          let year=$('#year').find('.swiper-slide-active').text().trim();
          let month=$('#month').find('.swiper-slide-active').text().trim();
          let day=$('#day').find('.swiper-slide-active').text().trim();
          let result=year+'-'+month+'-'+day;
          this.$emit('resultDate',result);
          $('.selectDate').hide();
        }
      }
    }
</script>

<style>
  @import "css/dialog-selectDate.css";
  @import "../../../assets/css/font-awesome.min.css";
  @import "../../../assets/css/swiper-3.4.2.min.css";
</style>
