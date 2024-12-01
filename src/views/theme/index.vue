<template>
    <div>
        <div>
            <el-radio-group v-model="currentTheme" @change="changeTheme">
                <el-radio label="默认" value="default"></el-radio>
                <el-radio label="vue官色" value="vue"></el-radio>
            </el-radio-group>
        </div>
        <h1 class="header-1">element-plus主题色：</h1>
        <div>
            <el-button type="primary" @click="">主色按钮</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { themes } from '@/styles/themes/themes'
import presetTheme from './presetUnoTheme'
const currentTheme = useLocalStorage('theme', 'default')
const changeTheme = (val: string) => {
    document.documentElement.className = val
    currentTheme.value = val
}

onMounted(() => {
    changeTheme(currentTheme.value)
    console.log(presetTheme({ theme: themes }).extendTheme({}))
})
</script>
<style lang="scss" scoped>
.header-1 {
    color: theme('colors.sidebar');
}
</style>
