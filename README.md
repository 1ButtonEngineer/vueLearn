<<<<<<< HEAD
## 制作首页APP
1.制作header区域，使用Mint-UI中的header组件
2.制作底部Tabbar区域，使用的是MUI的Tabbar.html
    +在制作 购物车 小图标的时候，操作会相对多一些；
    +先把扩展图标的css样式，拷贝到项目中
    +拷贝扩展字体库ttf文件，到项目中
    +为购物车小图标添加如下样式 'mui-icon mui-icon-extra mui-icon-extra-cart'
    +要在中间区域放置一个route-view来展示路有组件

##改造tabbar为router-link

##设置路由高亮 在路由中设置  'linkActiveClass'

##点击tabbar中路有的连接,展示对应的路有组件

##制作首页轮播图布局

##加载首页轮播图
1.获取数据，使用vue-resoure获取数据。。。
2.使用vue-resource 的 this.$http.get获取数据
3.获取到的数据，要保存到data身上
4.使用v-for循环渲染每个item选项

##改造九宫格区域的样式