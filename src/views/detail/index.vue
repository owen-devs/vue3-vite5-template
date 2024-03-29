<template>
    <div class="">
        <el-descriptions title="详情页类layout用法-不带菜单导航">
            <el-descriptions-item label="用户名">{{ user.userName }}</el-descriptions-item>
            <el-descriptions-item label="账号">{{ user.userAccount }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ user.userGender }}</el-descriptions-item>
            <el-descriptions-item label="年龄">{{ user.age }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ user.email }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ user.createTime }}</el-descriptions-item>
        </el-descriptions>
    </div>
</template>
<script lang="ts" setup>
const useInfoStore = useUserInfoStore()
const user = ref({})

const getDetail = () => {
    useInfoStore.getUserInfo().then((res) => {
        user.value = res || {}
    })
}

onMounted(() => {
    getDetail()
})
</script>
<route lang="yaml">
meta:
    layout: detail
    title: 用户详情页
</route>
