<template>
    <!-- 我们不知道什么时候可以拿到max的值，但是，总有一颗，会得到max值 -->
    <!-- 我们可以使用watch属性监听，来监听父组件传递过来的max值,不管watch会被触发几次，最后一次，就是我们要的值 -->
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1"  
        @change="countChanged" ref="numbox" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>

    <!-- 分析子组件神魔时候把数据传递给父组件 -->
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js"
    export default {
        mounted() {
            mui(".mui-numbox").numbox();
        },
        data() {
            return {}
        },
        methods : {
            countChanged() {
                //当文本框的数据被修改时，立即把最新的数据，通过事件调用,传递给父组件
                this.$emit('getCount', parseInt(this.$refs.numbox.value));
            }
        },
        props:["max"],
        watch: {
            //属性监听
           max: function (newVal, oldVal) {
                mui(".mui-numbox")
                    .numbox()
                    .setOption("max", newVal);
           }
        }
    }
</script>

<style lang="scss" scoped>

</style>