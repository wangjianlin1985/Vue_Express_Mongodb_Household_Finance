<template>
  <div class="index">
    <div class="index-header">
      <div class="index-header-left" v-on:click="confirmDate()">
        <h1>{{year}}</h1>
        <p>{{month}}月{{day}}日</p>
      </div>
      <div class="index-header-right">
        <h3>收支情况</h3>
        <p>收入:{{incomeMoney}}元&nbsp;&nbsp;&nbsp;支出:{{spendMoney}}元</p>
      </div>
    </div>
    <div class="index-list">
        <div class="list-option-income" v-on:click="requestIncome(7,0)">
          <p>今日收入</p>
        </div>
        <div class="list-option-spend native" v-on:click="requestSpend(7,0)">
          <p>今日支出</p>
        </div>
      <div class="index-content">
        <ul>
          <li v-for="data in data_list" v-on:click="click($event)">
            <div class="logo"><i v-bind:class="data.category_logo"></i></div>
            <div class="list-content">
              <p>{{data.category.split('>')[1].toString()}}</p>
            </div>
            <div class="count">
              <h3 v-bind:style="nowStyle">{{data.money.toFixed(2)}}</h3>
            </div>
            <div class="more">
              <i class="fa fa-angle-right fa-2x"></i>
            </div>
            <div class="detail">
              <p class="category"><b>分类</b>：{{data.category}}</p>
              <p class="time"><b>时间</b>：{{data.date}}  {{data.time}}</p>
              <p class="account"><b>账户</b>：{{data.account}}</p>
              <p class="description"><b>备注信息</b>：{{data.description==''?'暂无':data.description}}</p>
              <div class="operate" v-bind:data_id="data._id">
                <div class="edit" v-on:click="edit($event)">编辑</div>
                <div class="delete" v-on:click="del($event)">删除</div>
                <div class="account_logo"><i v-bind:class="data.account_logo"></i></div>
              </div>
            </div>
          </li>
          <li v-if="data_list.length===0" id="empty">
            <div class="fa fa-exclamation-triangle fa-3x" id="epmty_logo"></div>
            <p>今天还没有记账！快去记一笔吧</p>
          </li>
          <li class="last">
            <p id="nothing" v-if="data_list.length!==0"></p>
            <div class="record" v-on:click="add()">
              <i class="fa fa-pencil fa-2x"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <dialogSelectDate id="dialogSelectDate" v-on:resultDate="showDate"></dialogSelectDate>
    <dialogBox v-bind:message="error" v-bind:href="location" id="dialog"></dialogBox>
    <dialogConfirm id="dialogConfirm" v-bind:_id="selected_id" v-bind:option="selected_option" v-bind:logout_content="detail" v-on:returnLoad="reLoad"  v-on:returnState="reLogin"></dialogConfirm>
    <backTop></backTop>
  </div>
</template>

<script>
  import dialogSelectDate from '../public/dialog-selectDate/dialog-selectDate.vue'
  import dialogBox from '../public/dialog-box/dialog-box.vue'
  import dialogConfirm from '../public/dialog-confirm/dialog-confirm.vue'
  import backTop from '../public/backTop/backTop.vue'
    export default {
        name: 'index',
        data () {
            return {
                year:new Date().getFullYear(),  // 年份
                month:new Date().getMonth()+1,  //月份
                day:new Date().getDate(),       //日期
                data_list:[],      //渲染的数据集合，收入和支出数据全部都由data_list进行引用
                start:0,            //请求数据从第几个开始，初始化为0
                spendMoney:0,            //当天花费数目，由axios请求数据后获得，初始值为0
                incomeMoney:0,           //当天收入数目，与spendMoney相同
                nowStyle:{                //绑定的style样式值，区别收入和支出的样式
                    color:'red'
                },
                error:'',               //负责传送相关信息给弹窗组件显示
                location:'',             //负责传送路由给弹窗做后期处理
                selected_id:'',          //用于删除信息时传参给确认框组件进行删除请求
                selected_option:'',         //用于传递删除信息的类型，在确认框组件在进行判断
                detail:'你确定删除这条信息吗？'
            }
        },
       components:{dialogSelectDate,dialogBox,dialogConfirm,backTop},
       created:function () {
         /*********请求总数**********/
         this.requestAccount();
         /************************/
         this.start=0;
         this.requestSpend(7,0);
       },
       mounted:function () {
         /******隐藏相关子组件*****/
         $('#dialogSelectDate').hide();
         $('#dialog').hide();
         $('#dialogConfirm').hide();
         /***********************/
         /**************/
         $('#indexPage').addClass('clicked');
         $('#indexPage').siblings().removeClass('clicked');
         /**************/
         /*******局部加载数据*******/
         let that=this;
         that.start=0;
         $(window).scroll(function () {
           let scrollTop = $(this).scrollTop();
           let scrollHeight = $(document).height();
           let windowHeight = $(this).height();
           if((scrollTop + windowHeight == scrollHeight)&&(!$('#nothing').text())&&($('#nothing').length>0)){
             that.start+=7;
             if($('.list-option-spend').hasClass('native')){
               if($('#nothing').text()==''){
                 that.requestSpend(7,that.start);
               }
             }else if($('.list-option-income').hasClass('native')){
               if($('#nothing').text()==''){
                 that.requestIncome(7,that.start);
               }
             }
           }
         })
         /***********************/
         /*******单独点击事件****/
         $('.list-option-spend').click(function () {
           that.data_list=[];
           that.start=0;
           $('#nothing').empty();
         })
         $('.list-option-income').click(function () {
           that.data_list=[];
           that.start=0;
           $('#nothing').empty();
         })
         /*************************/
       },
      methods:{
         add:function () {
           if($('.list-option-spend').hasClass('native')){
             location.href='/#/spend'
           }else {
               location.href='/#/income'
           }
         },
         requestSpend:function (limit,start) {                  //消费记录请求入口
           $('.list-option-spend').addClass('native');
           $('.list-option-income').removeClass('native');
           this.nowStyle={
             color:'red'
           }
           let that=this;
           let date=that.year+'-'+that.month+'-'+that.day;
           this.$ajax.get('/api/spendList',{
             params:{
               date:date,
               token:sessionStorage.getItem('token'),
               user_id:sessionStorage.getItem('id'),
               limit:limit,
               start:start
             }
           }).then(function (response) {
             if(response.data.result.length===0){
                 $('#nothing').text('( ¯▽¯；)没有啦！');
                 that.start=0;  //目前由于太喜欢操作dom，用这个赋值方法可以避免start值随便自加
             }else {
               response.data.result.forEach(function (value,index) {
                 that.data_list.push(value)
               })
             }
           }).catch(function (error) {
             if(error.response){
               that.error=error.response.data.error.message||error.response.data.error;
               that.location='/#/login'
               $('#dialog').show();
               $('#loading').hide();
             }
           })
         },
         click:function (e) {
           let now=e.currentTarget;
           $(now).find('.more i').toggleClass('fa-angle-down');
           $(now).find('.detail').slideToggle();
           $(now).siblings().find('.detail').slideUp();
           $(now).siblings().find('.more i').removeClass('fa-angle-down');
           $(now).siblings().find('.more i').addClass('fa-angle-right');
         },
         requestIncome:function (limit,start) {             //收入记录请求入口
           $('.list-option-income').addClass('native');
           $('.list-option-spend').removeClass('native');
           this.nowStyle={
               color:'green'
           }
           let that=this;
           let date=that.year+'-'+that.month+'-'+that.day;
           this.$ajax.get('/api/incomeList',{
             params:{
               date:date,
               token:sessionStorage.getItem('token'),
               user_id:sessionStorage.getItem('id'),
               limit:limit,
               start:start
             }
           }).then(function (response) {
             if(response.data.result.length===0){
               $('#nothing').text('( ¯▽¯；)没有啦！');
               that.start=0;
             }else {
               response.data.result.forEach(function (value,index) {
                 that.data_list.push(value)
               });
             }
           }).catch(function (error) {
             if(error.response){
               that.error=error.response.data.error.message||error.response.data.error;
               that.location='/#/login'
               $('#dialog').show();
               $('#loading').hide();
             }
           })
         },
        requestAccount:function () {
          let that=this;
          let date=that.year+'-'+that.month+'-'+that.day;
          this.$ajax.get('/api/accountMoney',{
              params:{
                date:date,
                token:sessionStorage.getItem('token'),
                user_id:sessionStorage.getItem('id')
              }
          }).then(function (response) {
            that.spendMoney=response.data.result.accountSp;
            that.incomeMoney=response.data.result.accountIn;
          }).catch(function (error) {
            if(error.response){
              that.error=error.response.data.error.message||error.response.data.error;
              that.location='/#/login'
              $('#dialog').show();
              $('#loading').hide();
            }
          })
        },
         edit:function (e) {
           let now=e.currentTarget;
           let id=$(now).parent().attr('data_id');
           if($('.list-option-spend').hasClass('native')){
             this.$router.push({name:'spendEdit',query:{id:id}});
           }else {
             this.$router.push({name:'incomeEdit',query:{id:id}});
           }

         },
         del:function (e) {
           if($('#nothing').text()){
             $('#nothing').empty();
           }
           let now=e.currentTarget;
           let id=$(now).parent().attr('data_id');
           if($('.list-option-spend').hasClass('native')){
               this.selected_id=id;
               this.selected_option='.list-option-spend';
               $('#dialogConfirm').show();
           }else{
               this.selected_id=id;
               this.selected_option='.list-option-income';
               $('#dialogConfirm').show();
           }
         },
        reLoad:function (data) {
             let that=this;
          if(data.state===true){
            if(data.option==='spend'){
              this.data_list=[];
              this.requestSpend(7,0);
            }else {
              this.data_list=[];
              this.requestIncome(7,0);
            }
          }
          this.requestAccount();
          $(window).animate({scrollTop:0},function () {
            that.start=0;
            $('#nothing').empty();
          })
        },
        reLogin:function (data) {
          if(data.state===true){
            this.error=data.error;
            this.location='/#/login'
            $('#dialog').show();
          }
        },
        confirmDate:function () {
          $('#dialogSelectDate').show();
        },
        showDate:function (data) {
          this.year=data.split('-')[0];
          this.month=data.split('-')[1];
          this.day=data.split('-')[2];
          this.data_list=[];
          this.requestAccount();
          this.requestSpend(7,this.start);
        }
      }
    }
</script>

<style>
@import "css/index.css";
@import "../../assets/css/font-awesome.min.css";
</style>
