<template>
    <div>
        <div>
            <el-radio-group v-model="themeModel">
                <el-radio label="默认" value="default"></el-radio>
                <el-radio label="vue官色" value="vue"></el-radio>
            </el-radio-group>
        </div>
        <h1 class="c-base">element-plus主题色：</h1>
        <div>
            <el-button type="primary" @click="">主色按钮</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
const { themeModel } = useTheme()
</script>
<style lang="scss" scoped></style>
