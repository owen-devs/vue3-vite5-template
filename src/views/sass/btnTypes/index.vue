<template>
    <div class="mt-50px">
        <el-button type="" class="btn type-1" @click="">按钮</el-button>
        <el-button type="" class="btn type-2" @click="">按钮</el-button>
        <el-button type="" class="btn type-3" @click="">按钮</el-button>
        <el-button type="" class="btn type-4" @click="">按钮</el-button>
        <el-button type="" class="btn type-5" @click="">按钮</el-button>
    </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
$btnColors: #409eff, #67c23a, #e39827, #f54343, #6c6d71;

@for $i from 1 through length($btnColors) {
    .btn.type-#{$i} {
        $color: nth($btnColors, $i);
        background-color: $color;
        color: #fff;
        &:hover {
            background-color: lighten($color, 10%);
        }
        &:active {
            background-color: darken($color, 10%);
        }
        &:disabled {
            background-color: lighten($color, 20%);
            color: lighten($color, 40%);
        }
    }
}
</style>
