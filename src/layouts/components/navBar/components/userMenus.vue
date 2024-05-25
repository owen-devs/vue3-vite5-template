<template>
    <el-dropdown class="mr-20px !outline-0" :teleported="false" @command="commands">
        <div class="flex items-center cursor-pointer !outline-0">
            <el-icon size="20">
                <i class="block w-full h-full i-ri-account-circle-line c-bg0"></i>
            </el-icon>
            <div class="c-bg0 mx-5px lh-18px text-16px">管理员某某</div>
            <el-icon size="18">
                <i class="block w-full h-full i-ep-caret-bottom c-bg0"></i>
            </el-icon>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="item in menus" :command="item.command" :key="item.command">
                    {{ item.label }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts" setup>
const menus = ref([
    {
        label: '个人信息',
        command: 'info'
    },
    {
        label: '修改密码',
        command: 'pwd'
    },
    {
        label: '退出登录',
        command: 'logout'
    }
])

const commands = (c) => {
    console.log(c)
    switch (c) {
        case 'info':
            showInfo()
            break
        case 'pwd':
            showPwd()
            break
        case 'logout':
            goLogout()
            break
    }
}

const showInfo = () => {
    console.log('121212')
    ElMessage.success('232323232')
}
const showPwd = () => {
    console.log('3434343')
}
const goLogout = () => {
    console.log('6767667')
}
</script>

<style lang="scss" scoped></style>
