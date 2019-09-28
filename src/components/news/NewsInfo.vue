<template>
    <div class="newsinfo-container">
        <h3 class="title">时不利兮骓不逝</h3>
        <p class="subtitle">
            <span>发表时间:{{newsinfo.add_time | dateFormat}}</span>
            <span>点击: {{newsinfo.click}}次</span>
        </p>

        <hr>

        <div class="content" v-html="newsinfo.content"></div>

        <comment-box :id="this.id"></comment-box> 
    </div>
</template>

<script>
    
    import comment from '../subcmps/comment.vue';

    export default {
        data() {
            return {
                id: this.$route.params.id,//将url地址中传过来的id值挂载到data上，方便以后调用
                newsinfo: []
            };
        },
        created () {
            this.getNewsInfo()
        },
        methods: {
            getNewsInfo() { //获取新闻详情
                this.$http.get('api/getnew/' + this.id).then(result => {
                    if(result.body.status === 0) {
                        this.newsinfo = result.body.message[0];
                    } else {
                        Toast("获取新闻失败")
                    }
                })
            }
        },
        components: {
            'comment-box': comment
        }  
    }
</script>

<style lang="scss" scoped>
    .newsinfo-container {
        padding: 0 4px;
        .title {
            font-size: 14px;
            text-align: center;
            margin: 15px 0;
            color: red;
        }
        .subtitle {
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
    }
</style>