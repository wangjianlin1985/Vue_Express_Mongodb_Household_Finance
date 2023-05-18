<template>
  <div class="assetList">
    <div class="assetList-header">
      <p>总资产</p>
      <h1>{{allMoney}}</h1>
      <div class="assetList-header-item">
        <div class="assetList-spend">
          总消费（较上月）<br>{{compare.spend.toFixed(2)}}({{compare.spendPercentage}}%)
        </div>
        <div class="assetList-income">
          总收入（较上月）<br>{{compare.income.toFixed(2)}}({{compare.incomePercentage}}%)
        </div>
      </div>
    </div>
    <div class="assetList-content">
      <ul>
        <li>
          <ul>
            <p class="assetList-title">现金账户</p>
            <li item="现金">
              <i class="iconfont icon-xianjin" style="color: #006400"></i>现金<span>{{(assetJson.cash.income-assetJson.cash.spend).toFixed(2)}}</span><br><br>
              <p class="assetList-detail">总支出：{{assetJson.cash.spend.toFixed(2)}}<br>总收入：{{assetJson.cash.income.toFixed(2)}}<a class="assetList-href" v-on:click="toCheck($event)">详情</a></p>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <p class="assetList-title">信用卡</p>
            <li item="信用卡">
              <i class="iconfont icon-xinyongqia" style="color: #DAA520"></i>信用卡<span>{{(assetJson.creditCard.income-assetJson.creditCard.spend).toFixed(2)}}</span><br><br>
              <p class="assetList-detail">总支出：{{assetJson.creditCard.spend.toFixed(2)}}<br>总收入：{{assetJson.creditCard.income.toFixed(2)}}<a class="assetList-href" v-on:click="toCheck($event)">详情</a></p>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <p class="assetList-title">金融账户</p>
            <li item="银行卡">
              <i class="iconfont icon-yinxingqia" style="color: #2F4F4F"></i>银行卡<span>{{(assetJson.bankCard.income-assetJson.bankCard.spend).toFixed(2)}}</span><br><br>
              <p class="assetList-detail">总支出：{{assetJson.bankCard.spend.toFixed(2)}}<br>总收入：{{assetJson.bankCard.income.toFixed(2)}}<a class="assetList-href" v-on:click="toCheck($event)">详情</a></p>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <p class="assetList-title">虚拟账户</p>
            <li item="饭卡">
              <i class="iconfont icon-fanqia2" style="color: #FF4500"></i>饭卡<span>{{(assetJson.mealCard.income-assetJson.mealCard.spend).toFixed(2)}}</span><br><br>
              <p class="assetList-detail">总支出：{{assetJson.mealCard.spend.toFixed(2)}}<br>总收入：{{assetJson.mealCard.income.toFixed(2)}}<a class="assetList-href" v-on:click="toCheck($event)">详情</a></p>
            </li>
            <li item="支付宝">
              <i class="iconfont icon-page1" style="color: #007aff"></i>支付宝<span>{{(assetJson.aliPay.income-assetJson.aliPay.spend).toFixed(2)}}</span><br><br>
              <p class="assetList-detail">总支出：{{assetJson.aliPay.spend.toFixed(2)}}<br>总收入：{{assetJson.aliPay.income.toFixed(2)}}<a class="assetList-href" v-on:click="toCheck($event)">详情</a></p>
            </li>
            <li item="公交卡">
              <i class="iconfont icon-gongjiaoqia" style="color: #000000"></i>公交卡<span>{{(assetJson.busCard.income-assetJson.busCard.spend).toFixed(2)}}</span><br><br>
              <p class="assetList-detail">总支出：{{assetJson.busCard.spend.toFixed(2)}}<br>总收入：{{assetJson.busCard.income.toFixed(2)}}<a class="assetList-href" v-on:click="toCheck($event)">详情</a></p>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <p class="assetList-title">负债账户</p>
            <li item="应付款项">
              <i class="iconfont icon-xiangmuguanli_yingshouzhangkuan" style="color: #FF6347"></i>应付款项<span>{{(assetJson.payable.income-assetJson.payable.spend).toFixed(2)}}</span><br><br>
              <p class="assetList-detail">总支出：{{assetJson.payable.spend.toFixed(2)}}<br>总收入：{{assetJson.payable.income.toFixed(2)}}<a class="assetList-href" v-on:click="toCheck($event)">详情</a></p>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <p class="assetList-title">债权账户</p>
            <li item="应收款项">
              <i class="iconfont icon-yingshoukuanxiang" style="color: #FFD700"></i>应收款项<span>{{(assetJson.receivable.income-assetJson.receivable.spend).toFixed(2)}}</span><br><br>
              <p class="assetList-detail">总支出：{{assetJson.receivable.spend.toFixed(2)}}<br>总收入：{{assetJson.receivable.income.toFixed(2)}}<a class="assetList-href" v-on:click="toCheck($event)">详情</a></p>
            </li>
            <li item="公司报销">
              <i class="iconfont icon-baoxiao" style="color: #696969"></i>公司报销<span>{{(assetJson.reimbursement.income-assetJson.reimbursement.spend).toFixed(2)}}</span><br><br>
              <p class="assetList-detail">总支出：{{assetJson.reimbursement.spend.toFixed(2)}}<br>总收入：{{assetJson.reimbursement.income.toFixed(2)}}<a class="assetList-href" v-on:click="toCheck($event)">详情</a></p>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <p class="assetList-title">投资账户</p>
            <li item="基金用户">
              <i class="iconfont icon-jijin" style="color: #a9a9a9"></i>基金用户<span>{{(assetJson.fund.income-assetJson.fund.spend).toFixed(2)}}</span><br><br>
              <p class="assetList-detail">总支出：{{assetJson.fund.spend.toFixed(2)}}<br>总收入：{{assetJson.fund.income.toFixed(2)}}<a class="assetList-href" v-on:click="toCheck($event)">详情</a></p>
            </li>
            <li item="余额宝">
              <i class="iconfont icon-yuebao" style="color: #FF4500"></i>余额宝<span>{{(assetJson.aliTreasure.income-assetJson.aliTreasure.spend).toFixed(2)}}</span><br><br>
              <p class="assetList-detail">总支出：{{assetJson.aliTreasure.spend.toFixed(2)}}<br>总收入：{{assetJson.aliTreasure.income.toFixed(2)}}<a class="assetList-href" v-on:click="toCheck($event)">详情</a></p>
            </li>
            <li item="股票账户">
              <i class="iconfont icon-gupiao-copy" style="color: #800000"></i>股票账户<span>{{(assetJson.stock.income-assetJson.stock.spend).toFixed(2)}}</span><br><br>
              <p class="assetList-detail">总支出：{{assetJson.stock.spend.toFixed(2)}}<br>总收入：{{assetJson.stock.income.toFixed(2)}}<a class="assetList-href" v-on:click="toCheck($event)">详情</a></p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <dialogBox v-bind:message="error" v-bind:href="location" id="dialog"></dialogBox>
  </div>
</template>

<script>
    import dialogBox from '../public/dialog-box/dialog-box.vue'
    export default {
        name: '',
        data () {
            return {
              error:'',
              location:'',
              date:{
                year:new Date().getFullYear(),
                month:new Date().getMonth()+1
              },
              assetJson:{
                cash:{spend:0, income:0},
                creditCard:{spend:0, income:0},
                bankCard:{spend:0, income:0},
                mealCard:{spend:0, income:0},
                aliPay:{spend:0, income:0},
                busCard:{spend:0, income:0},
                payable:{spend:0, income:0},
                receivable:{spend:0, income:0},
                reimbursement:{spend:0, income:0},
                fund:{spend:0, income:0},
                aliTreasure:{spend:0, income:0},
                stock:{spend:0, income:0}
              },
              compareJson:{
                now_accountSp: 0,
                now_accountIn: 0,
                pre_accountSp:0,
                pre_accountIn:0
              }
            }
        },
        computed:{
            allMoney:function () {
              let all=0;
              for(let key in this.assetJson){
                all+=this.assetJson[key].income-this.assetJson[key].spend;
              }
              return all.toFixed(2);
            },
            compare:function () {
              let spend=this.compareJson.now_accountSp-this.compareJson.pre_accountSp;
              let spendPercentage=spend/this.compareJson.pre_accountSp;
              let income=this.compareJson.now_accountIn-this.compareJson.pre_accountIn;
              let incomePercentage=income/this.compareJson.pre_accountIn;
              return {
                  spend:spend,
                  income:income,
                  spendPercentage:(isNaN(spendPercentage)||!isFinite(spendPercentage))?'0.00':(spendPercentage*100).toFixed(2),
                  incomePercentage:(isNaN(incomePercentage)||!isFinite(incomePercentage))?'0.00':(incomePercentage*100).toFixed(2)
              }
            },
            pre_date:function () {
              let pre_date={
                  year:0,
                  month:0
              };
              if(this.date.month===1){
                  pre_date.year=this.date.year-1;
                  pre_date.month=12;
              }else {
                pre_date.year=this.date.year
                pre_date.month=this.date.month-1;
              }
              return pre_date;
            }
        },
        mounted:function () {
          $('#dialog').hide();
          this.getAsset();
          $('.assetList-detail').parent().click(function () {
            $(this).find('.assetList-detail').slideToggle();
            $(this).parent().parent().siblings().find('.assetList-detail').hide();
          })
        },
        components:{dialogBox},
        methods:{
            getAsset:function () {
              let that=this;
              this.$ajax.get('/api/assetMoney',{
                params:{
                  token:sessionStorage.getItem('token'),
                  user_id:sessionStorage.getItem('id')
                }
              }).then(function (response) {
                  for(let key in that.assetJson){
                      that.assetJson[key].spend=(response.data.result.assetMoneyJson)[key].spend;
                      that.assetJson[key].income=(response.data.result.assetMoneyJson)[key].income;
                  }
                  that.getCompare();
              }).catch(function (error) {
                that.error=error.response.data.error.message||error.response.data.error;
                that.location='/#/login'
                $('#dialog').show();
                $('#loading').hide();
              })
            },
            getCompare:function () {
              let that=this;
              this.$ajax.get('/api/getCompare',{
                params:{
                  token:sessionStorage.getItem('token'),
                  user_id:sessionStorage.getItem('id'),
                  now_date:that.date.year+'-'+that.date.month,
                  pre_date:that.pre_date.year+'-'+that.pre_date.month
                }
              }).then(function (response) {
                  for(let key in that.compareJson){
                    that.compareJson[key]=response.data.result[key];
                  }
              }).catch(function (error) {
                that.error=error.response.data.error.message||error.response.data.error;
                that.location='/#/login';
                $('#dialog').show();
                $('#loading').hide();
              })
            },
            toCheck:function (e) {
              let money=$(e.currentTarget).parent().parent().find('span').text();
              let color=$(e.currentTarget).parent().parent().find('i').attr('style');
              let icon=$(e.currentTarget).parent().parent().find('i').attr('class');
              let title=$(e.currentTarget).parent().parent().attr('item');
              this.$router.push({name:'assetDetail',query:{
                  id:sessionStorage.getItem('id'),
                  money:money,
                  color:color,
                  icon:icon,
                  title:title
              }});
            }
        }
    }
</script>

<style>
  @import "css/assetList.css";
</style>
