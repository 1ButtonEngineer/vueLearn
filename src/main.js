
import Vue from 'vue'
//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由的包
Vue.use(VueRouter)

//2.1 导入 vue-resource
import VueResource from 'vue-resource'
//2.2 安装 vue-resource
Vue.use(VueResource)
//导入MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//1.3导入自己的router.js路有模块
import router from './router.js'



import app from './App.vue'

//按需导入Mint-UI中的组件

var vm = new Vue({
  el:'#app',
  render: c => c(app),
  router //1.4挂在路由对象到vm实例上
})