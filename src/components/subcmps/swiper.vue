<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 在组件中使用v-for循环的话，一定要使用key -->
            <!-- 将来谁使用此轮播图组件，谁为我们传递lunbotuList -->
            <!-- 此时，lunbotuList应该由父组件向子组件传递 -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img src="item.img" alt="" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>

    <!-- 分析: 为什么评论中的组件那么丑 -->
    <!-- 在首页中，轮播图宽高都是100%， -->
    <!-- 在商品详情中，轮播图 我们期望 高度为100%，宽度为自适应 -->

</template>      

<script>
export default {
    props: ["lunbotuList","isfull"]
}
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;

        .mint-swipe-item {
            text-align: center;
            &:nth-child(1) {
                background-color: red;
            }
            &:nth-child(2) {
                background-color: orange;
            }
            &:nth-child(3) {
                background-color: yellow;
            }

            img {
                height: 100%;
            }
        }
    
    }
    .full {
        width:100%;
    }
</style>