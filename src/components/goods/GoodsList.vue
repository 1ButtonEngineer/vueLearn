<template>
    <div class="goods-list">
         <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="getgoodsinfo(item.id)">
            <img
             :src="item.img_url" alt="">
             <h1 class="title">{{ item.title }}</h1>
             <div class="info">
                 <p class="price">
                     <span class="now">￥{{item.sell_price}}</span>
                     <span class="old">￥{{item.market_price}}</span>
                 </p>
                 <p class="sell">
                     <span>热买中</span>
                     <span>{{item.stock_quantity}}</span>
                 </p>
             </div>
        </div>

        <mt-button type="danger" size="large" @click = "getMore()">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        data() {
            //data往自己组件内部，挂在一些私有数据
            return {
                pageindex: 1,   //分页的页数
                goodslist: []
            };
        },
        created () {
            this.getGoodsList();
        },
        methods: {
            getGoodsList() {
                //获取商品列表
                this.$http
                    .get("api/getgoods?pageindex=" + this.pageindex)
                    .then(result => {
                        if(result.body.status === 0) {
                            // this.goodslist = result.body.message;
                            this.goodslist = this.goodslist.concat(result.body.message);
                        }
                    });
            },
            getgoodsinfo(id) {
                this.$router.push("/home/goodsInfo/" + id)
            },
            getMore() {
                this.pageindex++;
                this.getGoodsList();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        .goods-item {
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 3px #ccc;
            margin: 3px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 213px;
            img {
                width: 100%;
            }

            .title {
                font-size: 14px;
            }
            .info {
                background-color: #ccc;

                p {
                    margin:0;
                    padding: 3px;
                }

                .price {
                    .now {
                        color: red;
                        font-weight: bold;
                        font-size: 14px;

                    }
                    .old {
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 11px;
                    }
                }
                .sell {
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>