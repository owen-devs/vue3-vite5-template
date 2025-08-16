<template>
    <div class="pr-20px">
        <el-radio-group v-model="themeModel">
            <el-radio label="默认" value="default"></el-radio>
            <el-radio label="vue官色" value="vue"></el-radio>
        </el-radio-group>
    </div>
</template>
<script lang="ts" setup>
const { themeModel } = useTheme()
</script>
<style lang="scss" scoped></style>
