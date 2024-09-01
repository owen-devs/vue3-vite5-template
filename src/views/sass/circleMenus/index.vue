<template>
    <div class="mt-100px ml-100px meuns">
        <div class="menu-item" v-for="item in menus" :key="item.value">
            <i class="w-2em h-2em block" :class="item.icon" />
        </div>
    </div>
</template>
<script lang="ts" setup>
const menus = [
    {
        label: '',
        icon: 'i-ph-user-circle-duotone',
        value: '1'
    },
    {
        label: '',
        icon: 'i-ph-user-circle-duotone',
        value: '2'
    },
    {
        label: '',
        icon: 'i-ph-user-circle-duotone',
        value: '3'
    },
    {
        label: '',
        icon: 'i-ph-user-circle-duotone',
        value: '4'
    },
    {
        label: '',
        icon: 'i-ph-user-circle-duotone',
        value: '5'
    },
    {
        label: '',
        icon: 'i-ph-user-circle-duotone',
        value: '6'
    }
] as const
</script>
<style lang="scss" scoped>
@use 'sass:math';

.meuns {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 300px;
    height: 300px;
    background-color: gray;
    border-radius: 50%;
    &:before {
        position: absolute;
        content: 'icon-home';
        width: 150px;
        height: 150px;
        line-height: 150px;
        border-radius: 50%;
        background-color: #fff;
        text-align: center;
        color: blueviolet;
    }
}

.menu-item {
    background-color: blueviolet;
    border-radius: 50%;
    position: absolute;
}

$r: 112px;
$n: 6;
$step: 360deg / $n;

@for $i from 1 through $n {
    .menu-item:nth-child(#{$i}) {
        $deg: $step * ($i - 1);
        $x: $r * math.sin($deg);
        $y: $r * math.cos($deg) * -1;
        transform: translate($x, $y);
    }
}
</style>
