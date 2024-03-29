<template>
    <div>
        <div>子组件输入title：</div>
        <el-input v-model="title"></el-input>
        <div>子组件输入modelvalue：</div>
        <el-input v-model="modelValue"></el-input>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})

const modelValue = defineModel()

const title = defineModel('title')

watch(
    () => title,
    (val: string) => {
        console.log('子组件title变化了', val)
    }
)
watch(
    () => modelValue,
    (val: string) => {
        console.log('子组件modelValue变化了', val)
    }
)
</script>

<style lang="scss" scoped></style>
