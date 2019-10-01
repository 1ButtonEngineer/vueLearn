<template>
    <div>

        <!-- 轮播图区域 -->

        <mt-swipe :auto="4000">
            <!-- 在组件中使用v-bind，必须使用key -->
            <mt-swipe-item>1</mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>

            <!-- 因为缺少轮播图的api，这里不能使用 -->
            <!-- <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img src="item.img" alt="">
            </mt-swipe-item> -->

        </mt-swipe>


        <!-- 图标 -->
       
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                <img src="../../images/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photoslist">
                <img src="../../images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
               <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
               <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul> 
    </div>
</template>

<script>

import {Toast} from 'mint-ui'

    export default {
        data() {
            return {
                lunbotuList: []//保存轮播图的数组
            }
        },
        created() {
            // this.getLunbotu();
        },
        methods: {
            getLunbotu() {
                // this.$http.get("api/getlunbo").then(result => {
                
                //     if(result.body.status === 0) {
                //         this.lunbotuList = result.body.message;

                //     }else {
                //         //获取图片失败
                //         Toast('加载轮播图失败');
                //     }
                // })
            }
        }
    }
</script>

<style lang="scss" scoped>
.mint-swipe {
    height: 200px;

    .mint-swipe-item {
        &:nth-child(1) {
            background-color: red;
        }
        &:nth-child(2) {
            background-color: orange;
        }
        &:nth-child(3) {
            background-color: yellow;
        }
    }
    
}

.mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    img {
        width: 45px;
    }
    .mui-media-body {
        font-size: 12px;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: none;
}

</style>