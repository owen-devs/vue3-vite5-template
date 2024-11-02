<template>
    <div class="h-60px flex items-center bg-sidebar">
        <el-button @click="changeCollapse" class="mr-0.5em" link>
            <el-icon class="!text-1.5em" :title="collapseStore.isCollapse ? '展开' : '收起'">
                <i
                    :class="{
                        'i-ri-indent-decrease': !collapseStore.isCollapse,
                        'i-ri-indent-increase': collapseStore.isCollapse
                    }"
                    class="c-bg2"
                />
            </el-icon>
        </el-button>
        <Breadcrumb class="flex-1" />
        <Themes />
        <UserMenus />
    </div>
</template>
<script lang="ts" setup>
import UserMenus from './components/userMenus.vue'
import Themes from './components/themes.vue'

const collapseStore = useCollapseStore()

const changeCollapse = () => {
    collapseStore.isCollapse = !collapseStore.isCollapse
    collapseStore.setCollapse(collapseStore.isCollapse)
}
</script>

<style lang="scss" scoped></style>
