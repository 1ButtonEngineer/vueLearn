<template>
    <div class="goods-container">
       <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
           <div class="ball" v-show="ballFlag" ref="ball"></div>
       </transition>
       <!-- 商品轮播图 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <!-- 商品参数区 -->

        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价: <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>
                        购买数量:<numbox @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small" @click="addToShopCar">加入购物车</mt-button>
                        <mt-button type="danger" size="small">立即购买</mt-button>
                        <!-- 分析: 如何实现加入购物车数量时，拿到选择的数量 -->
                        <!-- 1. 经过分析: 按钮属于goodsinfo页面， 数字属于numberbox组件 -->
                        <!-- 2. 由于涉及父子组件的嵌套，所以无法直接在goodsinfo页面中获取到选中商品的数量值 -->
                        <!-- 3. 想要拿到子组件中的数据，需要使用子组件向父组件传值 （事件调用机制） -->
                        <!-- 4. 事件调用的本质: 父向子传递方法， 自调用这个方法， 同时把数据作为参数传递给这个方法 -->
                    </p>
                </div>
            </div>
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{goodsinfo.goods_no}}</p>
                    <p>库存情况:{{goodsinfo.stock_quantity}}</p>
                    <p>上架时间:{{goodsinfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button><br>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    //导入轮播组件
    import swiper from '../subcmps/swiper.vue'
    import numbox from '../subcmps/goodsinfo_numbox.vue'
    export default {
        data() {
            return{
                id: this.$route.params.id, //将路由参数对象,挂在到数据上，方便以后调用
                lunbotu: [],//轮播图数据
                goodsinfo: [],//获取商品信息
                ballFlag: false, //控制小球的隐藏与显示标识符
                selectedCount: 1//默认顾客买一个
            }
        },
        created () {
            this.getLunbotu();
            this.getGoodsInfo();
        },
        methods: {
            getLunbotu() {
                this.$http.get("api/getthumimages/" + this.id).then(result => {
                    if(result.body.status === 0) {
                        //先循环轮播图数组的每一项，为item添加 img 属性，欣慰轮播图组件只认识iten.img,不认识item.src
                        result.body.message.forEach(item => {
                            item.img = item.src;
                        })
                        this.lunbotu = result.body.message;
                    }
                })
            },
            getGoodsInfo() {
                //获取商品信息
                this.$http.get('api/goods/getinfo/' + this.id).then(result => {
                    if(result.body.status === 0) {
                        this.goodsinfo = result.body.message[0];
                    }
                })
            },
            goDesc(id) {
                //点击跳转到图文介绍页面
                this.$router.push({name:"goodsdesc", params: {id}});
            },
            goComment(id) {
                //点击跳转到到评论区
                this.$router.push({name:"goodscomment", params: {id}});
            },
            addToShopCar() {
                //添加到购物车
                this.ballFlag = !this.ballFlag;
                //{id：商品的id, count:商品的数量, price: 商品的单价, selected: false}
                //拼接出一个，要保存到store中car数组里的 商品信息对象
                var goodsinfo = {
                    id: this.id,
                    count: this.selectedCount, 
                    price: this.goodsinfo.sell_price,
                    selected: true,
                }

                //调用store中的mutations来讲商品加入购物车中
                this.$store.commit("addToCar", goodsinfo);
            },
            beforeEnter(el) {
                el.style.transform = "translate(0,0)";
            },
            enter(el, done) {
                el.offsetWidth;
                //小球动画优化思路:
                //1.一开始，小球的起始位置和最终位置都被写死了，在不同手机或分辨率下就会出现问题
                //2.改动，不能写死坐标，应该动态分析起始位置和最终位置的坐标
                //    解决方案：先得到徽标的横纵坐标，再得到小球的横纵坐标然后求 x,y的差值
                //    如何获取徽标和晓求得位置？？？？domObject.getBoundingClientRect()

                //获取到小球鞋面上的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                const badgePosition = document
                .getElementById("badge")
                .getBoundingClientRect();

                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;

                el.style.transform = `translate(${xDist}px, ${yDist}px)`
                el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
                done();
            },
            afterEnter(el) {
                this.ballFlag = !this.ballFlag;
            },
            getSelectedCount(count) {
                //当子组件把选中的数量传给父组件时，把选中的值传递给data上
                this.selectedCount = count;
                console.log(this.selectedCount);
            }
        },
        components: {
            swiper,
            numbox
        }
    }
</script>

<style lang="scss" scoped>
    .goods-container {
        background-color: #eee;
        overflow: hidden;
    }
    .now_price {
        color: red;
        font-size: 15px;
        font-weight: bold;
    }
    .mui-card-footer {
        display: block;
       
    }
    .ball {
        width: 15px;
        height: 15px;
        top: 409px;
        left: 132px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
    }
</style>