<template>
    <div class="p-1em flex items-center">
        <el-button @click="changeCollapse" class="mr-0.5em" link>
            <el-icon class="!text-1.5em" :title="collapseStore.isCollapse ? '展开' : '收起'">
                <i
                    :class="{
                        'i-ri-indent-decrease': !collapseStore.isCollapse,
                        'i-ri-indent-increase': collapseStore.isCollapse
                    }"
                />
            </el-icon>
        </el-button>
        <Breadcrumb />
    </div>
</template>

<script lang="ts" setup>
const collapseStore = useCollapseStore()

const changeCollapse = () => {
    collapseStore.isCollapse = !collapseStore.isCollapse
    collapseStore.setCollapse(collapseStore.isCollapse)
}
</script>

<style lang="scss" scoped></style>
