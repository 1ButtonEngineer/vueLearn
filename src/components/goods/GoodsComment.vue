<template>
    <div>
        <cmtbox :id="this.$route.params.id"></cmtbox>
    </div>
</template>

<script>
import cmtbox from '../subcmps/comment.vue'

export default {
    components: {
        cmtbox
    }
}
</script>

<style lang="scss" scoped>

</style>