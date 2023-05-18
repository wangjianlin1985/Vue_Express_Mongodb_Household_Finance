import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path:'/login',
      name:'Login',
      component:function (resolve) {
        require(['../components/login/Login.vue'], resolve)
      },
      meta:{
        isShow:false,   //下方导航栏是否显示
        auth:false      //该页面是否进行token验证，true为需要
      }
    },
    {
      path:'/register',
      name:'Register',
      component:function (resolve) {
        require(['../components/register/register.vue'], resolve)
      },
      meta:{
        isShow:false,
        auth:false
      }
    },
    {
      path:'/index',
      name:'Index',
      component:function (resolve) {
        require(['../components/index/index.vue'], resolve)
      },
      meta:{
        isShow:true,
        auth:true
      }
    },
    {
      path:'/spend',
      name:'spend',
      component:function (resolve) {
        require(['../components/spendForm/spendForm.vue'], resolve)
      },
      meta:{
        isShow:false,
        auth:true
      }
    },
    {
      path:'/spendEdit',
      name:'spendEdit',
      component:function (resolve) {
        require(['../components/spendForm/spendForm.vue'], resolve)
      },
      meta:{
        isShow:false,
        auth:true
      }
    },
    {
      path:'/incomeEdit',
      name:'incomeEdit',
      component:function (resolve) {
        require(['../components/incomeForm/incomeForm.vue'], resolve)
      },
      meta:{
        isShow:false,
        auth:true
      }
    },
    {
      path:'/income',
      name:'income',
      component:function (resolve) {
        require(['../components/incomeForm/incomeForm.vue'], resolve)
      },
      meta:{
        isShow:false,
        auth:true
      }
    },
    {
      path:'/spendList',
      name:'spendList',
      component:function (resolve) {
        require(['../components/spendList/spendList.vue'], resolve)
      },
      meta:{
        isShow:true,
        auth:true
      }
    },
    {
      path:'/incomeList',
      name:'incomeList',
      component:function (resolve) {
        require(['../components/incomeList/incomeList.vue'], resolve)
      },
      meta:{
        isShow:true,
        auth:true
      }
    },
    {
      path:'/info',
      name:'info',
      component:function (resolve) {
        require(['../components/info/info.vue'], resolve)
      },
      meta:{
        isShow:true,
        auth:true
      }
    },
    {
      path:'/asset',
      name:'assetList',
      component:function (resolve) {
        require(['../components/assetList/assetList.vue'], resolve)
      },
      meta:{
        isShow:false,
        auth:true
      }
    },
    {
      path:'/editInfo',
      name:'editInfo',
      component:function (resolve) {
        require(['../components/editInfo/editInfo.vue'], resolve)
      },
      meta:{
        isShow:false,
        auth:true
      }
    },
    {
      path:'/assetDetail',
      name:'assetDetail',
      component:function (resolve) {
        require(['../components/assetDetail/assetDetail.vue'], resolve)
      },
      meta:{
        isShow:false,
        auth:true
      }
    }
  ]
})
