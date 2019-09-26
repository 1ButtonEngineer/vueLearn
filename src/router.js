import VueRouter from 'vue-router'

//导入对应的路有组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [//配置路由对象规则
    {path: '/home', component: HomeContainer},
    {path: '/member', component: MemberContainer},
    {path: '/shopcar', component: ShopcarContainer},
    {path: '/search', component: SearchContainer},
  ],
  linkActiveClass: 'mui-active'//覆盖默认的路由的高亮的类，
  //默认的类叫做routerlink-active
})

// 把路由对象暴露出去
export default router