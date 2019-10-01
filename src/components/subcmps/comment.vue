<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea class="cmt-textarea" placeholder="请输入要吐槽的内容" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click = "postComments">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{i + 1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content === ''? '此用户很懒，什么都没有留下':item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click = "getMore()">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        data() {
            return {
                pageIndex: 1,//默认展示第一页数据
                comments: [],
                msg: ''
            }
        },
        created() {
            this.getComments();
        },
        methods: {
            getComments() {
                this.$http.get("api/getcomments/"+this.id+"?pageindex=" +this.pageIndex)
                .then(result => {
                    if(result.body.status === 0) {
                        // this.comments = result.body.message;
                        //每当获取最新的评论数据的时候，不要把老数据清空，拼接老数据，连接起来
                        this.comments = this.comments.concat(result.body.message);
                    } else {
                        Toast('获取评论失败！')
                    }
                });
            },
            postComments() {
                //发表评论
                //参数一: 请求url地址
                //餐数二: 提交给服务器的数据（content: this.msg）
                //参数三： 定义提交表单中数据的格式（emulateJSON:true）
                this.$http.post('api/postcomment/' + this.$route.params.id, {
                    content: this.msg.trim()
                }).then(function(result) {
                    if(result.body.status === 0) {
                        //拼接一个评论对象
                        var cmt = {
                            user_name: '匿名用户', 
                            add_time:Date.now(), 
                            content: this.msg.trim()
                        };
                        this.comments.push(cmt);
                        this.msg = '';
                    }
                    else {
                        Toast("获取评论请求失败！");
                    }
                })
            },
            getMore() {
                //加载更多
                this.pageIndex++;
                this.getComments();
            }
        },
        props:["id"]
    }
</script>

<style lang="scss" scoped>
    .cmt-container {
       h3 {
           font-size: 17px;
       }
        .cmt-textarea {
            font-size: 15px;
            height: 85px;
            margin-bottom : 5px;
        }
        .cmt-list {
            margin: 5px 0;
            .cmt-item {
                font-size : 13px;
                .cmt-title {
                    background-color: #ccc;
                    line-height: 30px;
                }
                .cmt-body {
                    line-height: 25px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>