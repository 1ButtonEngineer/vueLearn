import Vue from 'vue'

import { Header } from 'mint-ui'
Vue.component(Header.name, Header)

//导入MUI 的样式
import './lib/mui/css/mui.min.css'

import app from './App.vue'

//按需导入Mint-UI中的组件

var vm = new Vue({
  el:'#app',
  render: c => c(app)
})