<template>
    <el-scrollbar max-height="100vh">
        <el-menu
            :default-active="active"
            :collapse="collapseStore.isCollapse"
            class="!border-r-none"
        >
            <SubMenuItem :item="item" v-for="item in menus" :key="item?.path" />
        </el-menu>
    </el-scrollbar>
</template>
<script lang="ts" setup>
const router = useRouter()
const active = computed(() => router.currentRoute.value.path)

const collapseStore = useCollapseStore()

const menus = ref([
    {
        path: '/processDesigner',
        title: '流程设计列表',
        icon: 'i-ph-dots-three-circle-vertical-fill'
    },
    {
        path: '/userList',
        title: '用户管理',
        icon: 'i-ph-user-list-duotone'
    },
    {
        path: '/userInfo',
        title: '用户个人信息',
        icon: 'i-ph-user-circle-duotone'
    },
    {
        path: '/detail',
        title: '用户个人详情',
        icon: 'i-ph-dots-three-circle-vertical-fill'
    },
    {
        path: '/waterfallLayout',
        title: '瀑布流布局',
        icon: 'i-ph-dots-three-circle-vertical-fill'
    },
    {
        title: '无限菜单',
        path: '/loop',
        icon: 'i-ph-list-bullets-duotone',
        children: [
            {
                path: '/demo',
                title: '二级示例页-有下级',
                children: [
                    {
                        path: '/demo/child',
                        title: '三级菜单有下级',
                        children: [
                            {
                                path: '/demo/child/sub',
                                title: '四级菜单'
                            }
                        ]
                    },
                    {
                        path: '/demo/child2',
                        title: '三级菜单没下级'
                    }
                ]
            },
            {
                path: '/demo2',
                title: '二级示例页2-没下级'
            }
        ]
    }
])
</script>

<style lang="scss" scoped></style>
