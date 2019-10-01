<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{ photoinfo.add_item | dateFormat }}</span>
            <span>点击:{{ photoinfo.click }}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <div class="thumbs">
            <img class="preview-img" v-for="(item, index) in list" :src="item.src"
            height="100" @click="$preview.open(index, list)" :key="item.src">
        </div>
        <!-- 图片内容 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 放置评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
    //1. 导入评论子組件
    import comment from '../subcmps/comment.vue'

    export default {
        data() {
            return {
                id: this.$route.params.id,
                photoinfo: {},  //图片详情
                list: []
            };
        },   
        created() {
            this.getPhotoInfo();
            this.getThumbs();
        },
        methods: {
            getPhotoInfo() {
                //获取图片详情
                this.$http.get("api/getimageInfo/" + this.id).then(result => {
                    if(result.body.status === 0) {
                        this.photoinfo = result.body.message[0];
                    } 
                })
            },
            getThumbs() {
                //获取缩略图
                this.$http.get('api/getthumimages/' + this.id).then(result => {
                    if(result.body.status === 0) {
                        result.body.message.forEach(item => {
                            item.w = 600;
                            item.h = 400;
                        });
                        //把完整的数据保存到list中
                        this.list = result.body.message;
                    }
                })
            }
        },
        components: { //注册子组件
            'cmt-box': comment
        }
    }
</script>

<style lang="scss" scoped>
    .photoinfo-container {
        padding: 3px;
        h3 {
            color: #26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }

        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
        }
        .content {
            font-size: 13px;
            line-height: 27px;
        }
        .thumbs {
            img {
            margin:3px 7px;
            }
        }
    }
</style>