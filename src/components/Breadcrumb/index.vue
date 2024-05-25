<template>
    <el-breadcrumb class="text-exceed" separator=">">
        <el-breadcrumb-item
            v-for="(item, index) in breadList"
            :key="item.path"
            replace
            class="text-exceed !float-none"
        >
            <span class="c-dark9" :class="{ 'c-darkc': index === breadList.length - 1 }">
                {{ item.title }}
            </span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { flatttenMenusBreadcrumb } from '@/router/constantMenu'
const route = useRoute()

console.log(route)
const breadList = computed(
    () => flatttenMenusBreadcrumb.find((v) => v.path === route.path)?.breadcrumb || []
)
</script>
