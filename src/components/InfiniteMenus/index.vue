<template>
    <el-menu v-bind="$attrs">
        <SubMenuItem :item="item" v-for="item in $attrs.menus" :key="item?.path" />
    </el-menu>
</template>
<script lang="ts" setup></script>

<style lang="scss" scoped></style>
