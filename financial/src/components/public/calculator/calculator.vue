<template>
  <div class="calculator">
    <div class="calculator-content">
      <div class="calculator-main">
        <div class="calculator-key" index="7"><p>7</p></div>
        <div class="calculator-key" index="8"><p>8</p></div>
        <div class="calculator-key" index="9"><p>9</p></div>
        <div class="calculator-key-s" v-on:click="hide()"><p><i class="fa fa-angle-double-down"></i></p></div>
        <div class="calculator-key" index="4"><p>4</p></div>
        <div class="calculator-key" index="5"><p>5</p></div>
        <div class="calculator-key" index="6"><p>6</p></div>
        <div class="calculator-key-s" v-on:click="deleteOne()"><p><i class="fa fa-reply"></i></p></div>
        <div class="calculator-key" index="1"><p>1</p></div>
        <div class="calculator-key" index="2"><p>2</p></div>
        <div class="calculator-key" index="3"><p>3</p></div>
        <div class="calculator-key-s" id="C" v-on:click="empty()"><p>C</p></div>
        <div class="calculator-key" id="zero" index="0"><p>0</p></div>
        <div class="calculator-key" id="point" index="."><p>.</p></div>
        <div class="calculator-key-s" id="ok" v-on:click="hide()"><p>OK</p></div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                resultArray:[],
                resultFloat:0.00
            }
        },
        mounted:function () {
          let that=this;
          $('.calculator-key').click(function () {
            var value=$(this).attr('index');
            if(that.resultArray[0]=='0'&&!that.resultArray[1]){ //判断输入第一个数是否为0，如果是只能下一次输入小数点
                if(value=='.'){
                  that.resultArray.push(value);
                }else {
                    return false;
                }
            }else if($.inArray('.',that.resultArray)===1||that.resultArray.length==0){ //判断是否输入小数点，如果是下一次不能再次输入小数点
                if(value=='.'){
                    return false;
                }else {
                  that.resultArray.push(value);
                }
            } else {
              that.resultArray.push(value);
            }
            let resultString=that.resultArray.toString().split(',').join('');
            that.resultFloat=parseFloat(resultString).toFixed(2);
            that.$emit('resultMoney',that.resultFloat);
          })

          $('.calculator-main').children().on('touchstart',function () {
              $(this).css({'background-color':'#ffffff'})
              $(this).children('p').css({'color':'#2c3e50'})
          })
          $('.calculator-main').children().on('touchend',function () {
            $(this).css({'background-color':'#2c3e50'})
            $(this).children('p').css({'color':'#ffffff'})
          })
        },
        methods:{
            empty:function () {
                this.resultArray=[];
                this.resultFloat=parseFloat('0').toFixed(2);
                this.$emit('resultMoney',this.resultFloat);
            },
            deleteOne:function () {
                this.resultArray=this.resultArray.slice(0,this.resultArray.length-1);
                let resultString=this.resultArray.toString().split(',').join('');
                this.resultFloat=parseFloat(resultString).toFixed(2);
                this.$emit('resultMoney',this.resultFloat);
            },
            hide:function () {
              $('.calculator').fadeOut()
            }
        }
    }
</script>

<style>
  @import "css/calculator.css";
  @import "../../../assets/css/font-awesome.min.css";
</style>
