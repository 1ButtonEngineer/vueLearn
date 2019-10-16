
import Vue from 'vue'
//使用vue-devtool插件
Vue.config.devtools = true
//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由的包
Vue.use(VueRouter)

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)


//每次刚进入网站，必定调用main.js 在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: {  //this.$store.state. ***
    car: car //讲购物车中的数据，使用一个数组存储起来,在car数组中，存储一些商品的对象
            //可以将数据暂时设计成如下样式{id：商品的id, count:商品的数量, price: 商品的单价, selected: false}
  },
  mutations: { //this.$store.commit('方法名称', '按需传递唯一的参数')
    addToCar(state, goodsinfo) {
      //点击加入购物车，把商品信息，保存到store中的car上
      //分析: 
      //1. 如果购物车中, 之前已经有对应的商品了,那么只需更新数量
      //2. 如果没有，则直接吧商品数据，push到car中

      //假設在购物车中没有找到对应的商品
      var flag = false

      state.car.some(item =>{
        if(item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true
        }
      })

      //如果最终，循环完毕，得到的flag还是false,则把商品直接push进去
      if(!flag) {
        state.car.push(goodsinfo)
      }

      //当更新car之后，把car数组，存储到localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },

    updateGoodsInfo(state, goodsinfo) {
      //修改购物车中的商品数量值
      //分析:
      state.car.some(item => {
        if(item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      //当修改完商品数量 把最新的购物车数据在本地存储起来
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if(item.id == info.id) {
          item.selected = info.selected
        }
      })
      
      localStorage.setItem('car', JSON.stringify(state.car))
    },

    removeFormCar(state,id) {
        //根据id,从store中的购物车中删除对应得那个商品数据
        state.car.some((item, i) => {
          if(item.id == id){
            state.car.splice(i, 1)
            return true;
          }
        }) 
        localStorage.setItem('car', JSON.stringify(state.car))
    }

  },
  getters: {  //this.$store.getters.***
    getAllCount(state) {
      var singleProductSelectedNum = 0;
      state.car.forEach(item => {
        singleProductSelectedNum += item.count;
      })
      return singleProductSelectedNum;
    },

    getGoodsSelected(state) {
      var elements = {}
      state.car.forEach(item => {
        elements[item.id] = item.selected
      })
      return elements;

    },

    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count;
      })
      return o
    },
    
    getGoodsCountAndAmount(state) {
      var allElements = {
        count: 0, //勾选的数量
        amount: 0 //勾选的总价
      }

      state.car.forEach(item => {
        if(item.selected) {
          allElements.count += item.count
          allElements.amount += item.price * item.count
        }
      })
      return allElements;
    }
  }
})


//导入时间插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss"){
   return moment(dataStr).format(pattern)
})
//2.1 导入 vue-resource
import VueResource from 'vue-resource'
//2.2 安装 vue-resource
Vue.use(VueResource)


import VuePreview from 'vue-preview';
Vue.use(VuePreview)
//设置请求根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//全局设置post表单数据格式的组织形式
Vue.http.options.emulateJSON = 'true'
//导入MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//按需导入Mint-UI中的组件
// import { Header, Swipe, SwipeItem, Button, Lazyload} from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


//1.3导入自己的router.js路有模块
import router from './router.js'



import app from './App.vue'
//按需导入Mint-UI中的组件

new Vue({
  el:'#app',
  render: c => c(app),
  router, //1.4挂在路由对象到vm实例上
  store, //挂在状态管理对象
})