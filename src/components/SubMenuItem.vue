<template>
    <el-sub-menu v-if="item?.children?.length > 0" :index="item?.path" :key="item?.path">
        <template #title>
            <el-icon><i :class="item?.icon" /></el-icon>
            <span>{{ item?.title }}</span>
        </template>
        <template v-for="child in item?.children" :key="child?.path">
            <SubMenuItem v-if="child?.children?.length > 0" :item="child" />
            <el-menu-item v-else :key="child?.path" :index="child?.path" @click="goRoute(child)">
                <el-icon><i :class="child?.icon" /></el-icon>
                <template #title>{{ child.title }}</template>
            </el-menu-item>
        </template>
    </el-sub-menu>
    <el-menu-item v-else @click="goRoute(item)" :index="item.path" :key="item.title">
        <el-icon><i :class="item?.icon" /></el-icon>
        <template #title>{{ item.title }}</template>
    </el-menu-item>
</template>
<script lang="ts" setup>
defineProps({
    item: {
        type: Object,
        default: () => ({}),
        required: true
    }
})
const router = useRouter()
const routes = router.getRoutes().filter((v) => v.name)
const goRoute = (row: any) => {
    console.log(row)
    const isExist = routes.find((v) => v.path === row.path)
    console.log(isExist)
    if (isExist) {
        router.push({ path: row.path })
    }
}
</script>
