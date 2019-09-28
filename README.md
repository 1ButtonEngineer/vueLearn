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

##改造新闻链接资讯的内容。

##新闻资讯页面制作
1.绘制界面（使用mui中的media-list组件）
2.使用vue-resource获取数据
3.渲染真实的数据


##实现新闻列表资讯 点击到新闻的详情页
1. 吧列表中的每一项改造成router-link,同事，在跳转的时候应该提供唯一Id标识符
2. 创建新闻详情的组件页面  NewsInfo.vue
3. 在路由模块中，将新闻详情的的路有地址 和 组件页面 对应起来

##实现新闻详情 的页面布局 和 数据渲染

##单独封装一个 comment.vue 的评论子组件
1.先创建一个 单独 comment.vue组件模板
2.在需要使用comment组建的页面中，先手动导入comment组件
3.在父组件中使用'components'将刚才导入的cpmment组件，注册为自己的子组件
4.讲注册子组件时候的，注册名称，以标签形式，在页面中引用即可

##获取所有的评论数据显示到页面中

##实现评论功能
1.为加载更多按按钮，绑定事件，在时间中，请求下一页数据
2.点击加载更多 让pageIndex++ 然后重新调用this.getComments()方法获取最新一页的数据
3.为了防止新数据覆盖老数据的情况，每当获取到新数据的额情况，应当使用concat方法，进行拼接