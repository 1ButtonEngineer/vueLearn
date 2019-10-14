<template>
    <div class="shopCar-container">
        <!-- 商品列表区域 -->
        <div class="goods-list">
            <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        
                        <mt-switch @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"
                         v-model="$store.getters.getGoodsSelected[item.id]"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initcount=$store.getters.getGoodsCount[item.id] :goodsid="item.id"></numbox>
                                <!-- 问题: 如何获取购物车中的数量? -->
                                <!-- 我们先创建一个空对象 然后循环购物车中所有的商品数据，把当前循环的这条商品的ID, -->
                                <!-- 作为对象的属性名，count作为对象的属性值，这样把所有的商品循环一遍，就会得到一个对象 -->
                                <!-- {88：2, 89:1, 90:11} -->

                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div> 

        <!-- 结算区域 -->
        <div class="goods-list">
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner allPrice">
                        <div class="left">
                            <p>总计(不含运费)</p>
                            <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件,
                            总价￥<span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                        </div>
                        <mt-button type="danger">结算</mt-button>
                    </div>
                </div>
            </div>
        </div> 

    </div>
</template>

<script>
import numbox from '../subcmps/shopcar_numbox.vue'

export default {
    data() {
        return {
            goodslist: [] //购物车中所有的商品数据
        };
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList() {
            console.log(111);
            //1.获取store中所有的商品id，然后拼接用用一个逗号分隔开
            var idArr = [];

            this.$store.state.car.forEach(item => idArr.push(item.id));
            //如果购物车中没有商品，则直接返回，不需要请求数据接口，否则报错
            if(idArr.length <= 0) {
                return;
            }
            //获取购物车商品列表
            this.$http.get('api/goods/getshopcarlist/' + idArr.join(","))
            .then(result => {
                if(result.body.status === 0) {
                    this.goodslist = result.body.message;
                }
            })
        },
        remove(id, index) {
            //点击删除，把删除从store中根据传递的id删除， 同时 把对应组件中goodslist中对应的那个商品，用index删除
            this.goodslist.splice(index, 1);
            this.$store.commit("removeFormCar", id);
        },
        selectedChanged(id, val) {
            //每次点击开关把最新的开关状态同步到store中去
            //把最新的 所有的购物车商品状态同步到store上
            console.log(id + "-------" + val)
            this.$store.commit('updateGoodsSelected',{id, selected: val})
        }
    },
    
    components: {  
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .shopCar-container {
        background-color: #eee;
        overflow: hidden;

        .mui-card-content-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;

            img {
                width:49px;
                height: 49px;
                margin: 0 5px;

            }
            .info {
                 h1 {
                     
                    font-size: 14px;
                }
              

                .price {
                    color: red;
                    font-weight: bold;
                }
            }

        }
        .allPrice {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red{
                color: red;
                font-size: bold;
            }
        }
    }
</style>