<template>
    <el-container class="w-100vw h-100vh">
        <el-aside
            :width="asideWidth"
            class="flex flex-col overflow-auto side-bar transition-all ease-in-out duration-300 bg-sidebar-bg"
        >
            <logo />
            <side-bar class="flex-1" />
        </el-aside>
        <el-container>
            <el-header class="!p-0">
                <nav-bar />
            </el-header>
            <el-main class="!overflow-hidden !pt-0">
                <app-main />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
//@ts-ignore
import logo from './components/logo'
//@ts-ignore
import sideBar from './components/sideBar'
//@ts-ignore
import navBar from './components/navBar'
//@ts-ignore
import appMain from './components/appMain'

const collapseStore = useCollapseStore()

const asideWidth = computed(() => (collapseStore.isCollapse ? '64px' : '280px'))

useEventListener(
    'resize',
    useDebounceFn(() => {
        collapseStore.setCollapse(window.innerWidth < 768)
    }, 500)
)
</script>

<style lang="scss" scoped></style>
