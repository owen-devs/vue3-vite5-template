<template>
    <div class="w-300px h-300px bg-base mt-50px" v-svg-loading="on">内容正文</div>

    <el-button class="mt-30px" @click="toggle">{{ on ? '关闭' : '启动' }}</el-button>
</template>
<script lang="ts" setup>
const on = ref(true)
const toggle = () => {
    on.value = !on.value
}
</script>
<style lang="scss" scoped></style>
