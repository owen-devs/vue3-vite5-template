<template>
    <div class="pr-20px">
        <el-radio-group v-model="currentTheme" @change="changeTheme">
            <el-radio label="默认" value="default"></el-radio>
            <el-radio label="vue官色" value="vue"></el-radio>
        </el-radio-group>
    </div>
</template>
<script lang="ts" setup>
const currentTheme = useLocalStorage('theme', 'default')
const changeTheme = (val: string) => {
    document.documentElement.className = val
    currentTheme.value = val
}

onMounted(() => {
    changeTheme(currentTheme.value)
})
</script>
<style lang="scss" scoped></style>
