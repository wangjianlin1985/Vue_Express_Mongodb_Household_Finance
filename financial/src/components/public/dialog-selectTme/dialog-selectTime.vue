<template>
  <div class="selectTime">
    <div class="TimeDialog">
      <div class="selectTime-header">
        <i class="close fa fa-close fa-2x" v-on:click="close()"></i>
      </div>
      <div class="selectTime-content">
        <div class="time-title">
          <h3>点</h3>
          <h3>分</h3>
        </div>
        <div class="selectTime-option">
          <div class="swiper-container" id="hour">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="hour in hours">
                {{hour}}
                <div class="hr"></div>
              </div>
            </div>
          </div>
          <div class="swiper-container" id="minute">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="minute in minutes">
                {{minute}}
                <div class="hr"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="selectTime-footer">
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
                hours:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
                minutes:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','48','49','50','51','52','53','54','55','56','57','58','59']
            }
        },
        mounted:function () {
            let date=new Date();
          let hourSwiper=new Swiper('#hour',{
            direction: 'vertical',
            slidesPerView :5,
            centeredSlides:true,
            initialSlide:this.hours[date.getHours()],
          })
          let minuteSwiper=new Swiper('#minute',{
            direction: 'vertical',
            slidesPerView :5,
            centeredSlides:true,
            initialSlide:this.minutes[date.getMinutes()],
          })
        },
        methods:{
            confirm:function () {
              let hour=$('#hour').find('.swiper-slide-active').text().trim();
              let minute=$('#minute').find('.swiper-slide-active').text().trim();
              let result=hour+':'+minute;
              this.$emit('resultTime',result);
              $('.selectTime').hide();
            },
            close:function () {
              $('.selectTime').hide();
            }
        }
    }
</script>

<style>
  @import "css/dialog-selectTime.css";
  @import "../../../assets/css/swiper-3.4.2.min.css";
</style>
