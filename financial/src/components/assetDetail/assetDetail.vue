<template>
  <div class="assetDetail">
    <div class="assetDetail-header">
      <i v-bind:class="icon" v-bind:style="color"></i>
      <span class="assetDetail-title">{{title}}</span>
      <h1 class="assetDetail-money">{{money}}</h1>
      <p class="assetDetail-notice">余额</p>
      <div class="assetDetail-month">
        <h2 class="assetDetail-spend">{{monthSpend.toFixed(2)}}<br><p>本月消费</p></h2>
        <h2 class="assetDetail-income">{{monthIncome.toFixed(2)}}<br><p>本月收入</p></h2>
        <h2 class="assetDetail-leave">{{(monthIncome-monthSpend).toFixed(2)}}<br><p>本月结余</p></h2>
        <p class="assetDetail-date">{{year}}年{{month}}月</p>
      </div>
    </div>
    <div class="assetDetail-other">
      <div id="assetDetail-spend" class="assetDetail-active" v-on:click="active($event)">
        消费
      </div>
      <div id="assetDetail-income" v-on:click="active($event)">
        收入
      </div>
    </div>
    <div class="assetDetail-list">
      <ul>
        <li v-for="data in data_list">
          <div v-bind:class="data.category_logo" v-bind:style="style_color"></div>
          <div class="assetDetail-list-title">
            <p>{{data.category.split('>')[1]}}</p>
            <small>{{data.date}} {{data.time}}</small><br>
            <small>备注：{{data.description==''?'暂无':data.description}}</small>
          </div>
          <div class="assetDetail-list-money">{{data.money.toFixed(2)}}</div>
        </li>
        <li class="spendList-empty" v-show="data_list.length===0">
          <i class="fa fa-exclamation-triangle fa-3x"></i><br>
          本月好像没有记录什么消费哦
        </li>
        <li class="spendList-end" v-show="isEmpty">( ¯▽¯；)没有啦</li>
      </ul>
    </div>
    <dialogBox v-bind:message="error" v-bind:href="location" id="dialog"></dialogBox>
    <selectMonth v-on:resultDate='changeMonth'></selectMonth>
    <backTop></backTop>
  </div>
</template>

<script>
    import dialogBox from '../public/dialog-box/dialog-box.vue'
    import backTop from '../public/backTop/backTop.vue'
    import selectMonth from '../public/selectMonth/selectMonth.vue'
    export default {
        name: '',
        data () {
            return {
                error:'',
                location:'',
                id:this.$route.query.id,
                money:this.$route.query.money,
                color:this.$route.query.color,
                icon:this.$route.query.icon,
                title:this.$route.query.title,
                data_list:[],
                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                limit:7,
                start:0,
                isEmpty:false,
                monthSpend:0,
                monthIncome:0,
                style_color:{
                    'background-color':'#FF6666',
                }
            }
        },
        components:{dialogBox,backTop,selectMonth},
        mounted:function () {
          this.getSpendDate(this.title,this.limit,this.start);
          this.getMonthMoney(this.year,this.month);
          this.slideBottom();
          $('#dialog').hide();
        },
        methods: {
          getMonthMoney:function (year,month) {
            let that=this;
            let title=that.title;
            this.$ajax.get('/api/assetMonthMoney',{
              params:{
                date:year+'-'+month,
                token:sessionStorage.getItem('token'),
                user_id:sessionStorage.getItem('id'),
                title:title,
              }
            }).then(function (response) {
                that.monthSpend=response.data.result.accountSp;
                that.monthIncome=response.data.result.accountIn;
            }).catch(function (error) {
              that.error=error.response.data.error.message||error.response.data.error;
              that.location='/#/login'
              $('#dialog').show();
              $('#loading').hide();
            })
          },
          getSpendDate:function (title,limit,start) {
            let that=this;
            let year=that.year;
            let month=that.month;
            this.$ajax.get('/api/assetSpendDate',{
              params:{
                date:year+'-'+month,
                token:sessionStorage.getItem('token'),
                user_id:sessionStorage.getItem('id'),
                title:title,
                limit:limit,
                start:start
              }
            }).then(function (response) {
              if (response.data.result.length === 0) {
                that.isEmpty = true;
                that.start = 0;  //目前由于太喜欢操作dom，用这个赋值方法可以避免start值随便自加
              } else {
                response.data.result.forEach(function (value, index) {
                  that.data_list.push(value);
                })
              }
            }).catch(function (error) {
              that.error=error.response.data.error.message||error.response.data.error;
              that.location='/#/login'
              $('#dialog').show();
              $('#loading').hide();
            })
          },
          getIncomeDate:function (title,limit,start) {
            let that=this;
            let year=that.year;
            let month=that.month;
            this.$ajax.get('/api/assetIncomeDate',{
              params:{
                date:year+'-'+month,
                token:sessionStorage.getItem('token'),
                user_id:sessionStorage.getItem('id'),
                title:title,
                limit:limit,
                start:start
              }
            }).then(function (response) {
              if (response.data.result.length === 0) {
                that.isEmpty = true;
                that.start = 0;  //目前由于太喜欢操作dom，用这个赋值方法可以避免start值随便自加
              } else {
                response.data.result.forEach(function (value, index) {
                  that.data_list.push(value);
                })
              }
            }).catch(function (error) {
              that.error=error.response.data.error.message||error.response.data.error;
              that.location='/#/login'
              $('#dialog').show();
              $('#loading').hide();
            })
          },
          slideBottom:function () {
            let that=this;
            $(window).scroll(function () {
              let scrollTop = $(this).scrollTop();
              let scrollHeight = $(document).height();
              let windowHeight = $(this).height();
              if(scrollTop + windowHeight == scrollHeight&&that.isEmpty===false){
                that.start+=7;
                if($('#assetDetail-spend').hasClass('assetDetail-active')){
                  that.getSpendDate(that.title,that.limit,that.start);
                }else {
                  that.getIncomeDate(that.title,that.limit,that.start);
                }
              }
            })
          },
          changeMonth:function (data) {
            let that=this;
            if(that.month!==1&&data===1){
              that.month-=1;
            }else if(that.month===1&&data===1){
              that.year-=1;
              that.month=12;
            } else if(that.month!==12&&data===0){
              that.month+=1;
            }else if(that.month===12&&data===0){
              that.year+=1;
              that.month=1;
            }
            that.data_list=[];
            that.start=0;
            that.isEmpty=false;
            that.getMonthMoney(that.year,that.month);
            if($('#assetDetail-spend').hasClass('assetDetail-active')){
              that.getSpendDate(that.title,that.limit,that.start);
            }else {
                that.getIncomeDate(that.title,that.limit,that.start);
            }

          },
          active:function (e) {
            let that=this;
            $(e.currentTarget).addClass('assetDetail-active');
            $(e.currentTarget).siblings().removeClass('assetDetail-active');
            that.data_list=[];
            that.isEmpty=false;
            if($(e.currentTarget).attr('id')==='assetDetail-income'){
              that.getIncomeDate(that.title,that.limit,that.start);
              that.style_color['background-color']='#2E8B57'
            }else {
              that.getSpendDate(that.title,that.limit,that.start);
              that.style_color['background-color']='#FF6666'
            }
          }
        }
    }
</script>

<style>
  @import "../../assets/css/font-awesome.min.css";
  @import "css/assetDetail.css";
</style>
