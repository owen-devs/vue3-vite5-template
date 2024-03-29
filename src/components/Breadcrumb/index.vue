<template>
    <el-breadcrumb separator=">">
        <el-breadcrumb-item v-for="item in breadList" :key="item.path" :to="{ path: item.path }">
            {{ item.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const routes = router.getRoutes().filter((v) => v.name)
const isHome = computed(() => route.path === '/')

const breadList = computed(() => {
    if (isHome.value) {
        return []
    }
    const home = isHome.value ? [] : [{ title: import.meta.env.VITE_APP_TITLE, path: '/' }]
    const current = isHome.value ? [] : [{ title: route.meta?.title, path: route.path }]
    const list = []

    let parentNode = route
    let parentTitle = parentNode?.meta?.title
    let setMetaParent = parentNode?.meta?.parent

    while (parentTitle) {
        let nameSplits = parentNode?.name?.split('-') || []
        nameSplits.splice(-1, 1)
        let parentName = nameSplits.length > 0 ? nameSplits.join('-') : ''

        if (!parentName) break

        let node = routes.find(
            (v) => parentName && v.name === parentName && v?.meta?.title && v.path !== '/'
        )
        if (!node) break
        list.push({
            title: node?.meta?.title,
            path: node?.path
        })
        parentNode = node
    }
    list.reverse()
    return home.concat(list, current)
})
</script>
