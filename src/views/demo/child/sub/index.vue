<template>
    <div>四级有菜单页{{ route.name }}</div>
</template>
<script lang="ts" setup>
const route = useRoute()
console.log(route)
</script>
<route lang="yaml">
meta:
    title: 四级菜单页,
    parent: demo,
</route>
