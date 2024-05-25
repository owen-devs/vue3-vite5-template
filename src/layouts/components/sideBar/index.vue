<template>
    <el-scrollbar max-height="calc(100vh - 60px)" class="bg-sidebar sidebar-scrollbar">
        <InfiniteMenus
            :default-active="active"
            :collapse="collapseStore.isCollapse"
            class="!border-r-none el-menu-sidebar"
            background-color="#3E404C"
            text-color="#ccc"
            active-text-color="#2793ff"
            :menus="filterMenus"
        />
    </el-scrollbar>
</template>
<script lang="ts" setup>
import { filterMenus } from '@/router/constantMenu'

console.log(filterMenus)
const router = useRouter()
const active = computed(() => router.currentRoute.value.path)

const collapseStore = useCollapseStore()
</script>

<style lang="scss" scoped>
.el-menu-sidebar {
    :deep() {
        .el-sub-menu {
            &.is-active {
                > .el-sub-menu__title {
                    @apply c-base;
                }
            }
        }
    }
}
</style>
