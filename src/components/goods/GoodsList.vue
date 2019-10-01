<template>
    <div class="goods-list">
        <div class="goods-item">
            <img
             src="../../images/huoying1.jpg" alt="">
             <h1 class="title">一袋米抗几楼?</h1>
             <div class="info">
                 <p class="price">
                     <span class="now">￥2199</span>
                     <span class="old">￥2399</span>
                 </p>
                 <p class="sell">
                     <span>热买中</span>
                     <span>剩余9999件</span>
                 </p>
             </div>
        </div>
         <div class="goods-item">
            <img
             src="../../images/huoying2.jpg" alt="">
             <h1 class="title">一袋米抗2楼!</h1>
             <div class="info">
                 <p class="price">
                     <span class="now">￥2199</span>
                     <span class="old">￥2399</span>
                 </p>
                 <p class="sell">
                     <span>热买中</span>
                     <span>剩余9999件</span>
                 </p>
             </div>
        </div>
         <div class="goods-item">
            <img
             src="../../images/huoying3.jpg" alt="">
             <h1 class="title">一袋米我洗勒。</h1>
             <div class="info">
                 <p class="price">
                     <span class="now">￥2199</span>
                     <span class="old">￥2399</span>
                 </p>
                 <p class="sell">
                     <span>热买中</span>
                     <span>剩余9999件</span>
                 </p>
             </div>
        </div>
    </div>
</template>

<script>

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