import VueRouter from 'vue-router'

//导入对应的路有组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotosList from './components/photosList/photosList.vue'
import PhotoInfo from './components/photosList/photosInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [//配置路由对象规则
    {path: '/', redirect: '/home'},
    {path: '/home', component: HomeContainer},
    {path: '/member', component: MemberContainer},
    {path: '/shopcar', component: ShopcarContainer},
    {path: '/search', component: SearchContainer},
    {path: '/home/newslist', component: NewsList},
    {path: '/home/newsinfo/:id', component: NewsInfo},
    {path: '/home/photosList', component: PhotosList},
    {path: '/home/photosInfo/:id', component: PhotoInfo},
    {path: '/home/goodslist', component: GoodsList},
    {path: '/home/goodsInfo/:id', component: GoodsInfo, name: "goodsinfo"},
    {path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc'},
    {path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment'},
  ],
  linkActiveClass: 'mui-active'//覆盖默认的路由的高亮的类，
  //默认的类叫做routerlink-active
})

// 把路由对象暴露出去
export default router