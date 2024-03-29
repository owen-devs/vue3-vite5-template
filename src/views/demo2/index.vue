<template>
    <main>
        <h1 class="header-text keep-all">DEMO2 测试layout yaml页</h1>
        <Breadcrumb />
        <el-switch
            v-model="theme"
            @change="toggleDark()"
            active-value="dark"
            inactive-value="default"
            class="ml-2"
            active-text="dark"
            inactive-text="default"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />

        <el-dialog
            append-to-body
            class=""
            v-model="dialogVisible"
            title="Tips"
            width="30%"
            draggable
        >
            <span>It's a draggable Dialog</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
                </span>
            </template>
        </el-dialog>
        <el-button @click="dialogVisible = true">打开对话框</el-button>

        <el-drawer append-to-body v-model="drawer" title="I am the title" direction="rtl">
            <span>Hi, there!</span>
        </el-drawer>
        <el-button @click="drawer = true">打开抽屉</el-button>

        <div class="w-140px px-5px inline-block bg-green py-0px flex items-center justify-center">
            <Operations :key="123">
                <el-button link @click.stop="showBtn('11212.txt')">下载</el-button>
                <el-button link @click.stop="showBtn('11212.txt')">删除</el-button>
                <el-button link @click.stop="showBtn('11212.txt')">详情</el-button>
                <el-button link @click.stop="showBtn('11212.txt')">编辑</el-button>
            </Operations>
        </div>
        <div class="test-text h-1000px">测试文字变量</div>
    </main>
</template>

<script lang="ts" setup>
import { download } from '@/utils/download'
const { pageSize, pageNo, total } = usePagination()

//	const theme = ref(true)
localStorage.setItem('theme', 'blue')

const theme = ref('default')

const isDark = useDark()
const toggleDark = useToggle(isDark)

//	download("11212.txt")
console.log(pageSize, pageNo, total)

const dialogVisible = ref(false)
const drawer = ref(false)

const showBtn = (text: string) => {
    ElMessage.success(text)
}

const route = useRoute()
console.log(route)

const { count, increment } = useCounterStore()
increment()
console.log(count)
</script>

<style lang="scss" scoped>
.header-text {
    color: var(--base-bg-color);
    @apply bg-red;
}
.test-text {
    color: var(--el-color-0);
}
</style>
<route lang="yaml">
meta:
    title: 示例页面
</route>
