<template>
    <div class="uset-list-container">
        <div class="flex justify-between items-center">
            <h4>流程设计列表</h4>
            <div class="">
                <el-button type="primary" @click="create">
                    新建流程
                    <el-icon class="ml-0.5em"><i class="i-ph-plus-circle-light" /></el-icon>
                </el-button>
            </div>
        </div>
        <div class="flex justify-end items-center py-0.5em">
            <div class="flex-1"></div>
            <div>
                <el-input
                    v-model="searchs.userName"
                    placeholder="模糊搜索流程名称或创建人"
                    @change="getProcesses(true)"
                >
                    <template #append>
                        <el-button @click="getProcesses(true)">
                            <el-icon><i class="i-ph-magnifying-glass" /></el-icon>
                        </el-button>
                    </template>
                </el-input>
            </div>
        </div>
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column prop="userName" label="姓名" width="100" />
            <el-table-column prop="userAccount" label="账号" width="120" />
            <el-table-column prop="age" label="年龄" width="80" />
            <el-table-column prop="userGender" label="性别" :formatter="formatGender" width="80" />
            <el-table-column prop="email" label="邮箱" min-width="150" />
            <el-table-column prop="createTime" label="创建时间" min-width="150" />
            <el-table-column prop="updateTime" label="最近更新时间" min-width="150" />
            <el-table-column label="操作" width="180">
                <template #default="{ row }">
                    <Operations :key="row.userId">
                        <el-button type="primary" @click="modify(row)" link>编辑</el-button>
                        <el-popconfirm
                            title="确定要删除用户?"
                            width="180"
                            confirm-button-text="确定"
                            cancel-button-text="取消"
                            @confirm="() => deleteUserr(row)"
                        >
                            <template #reference>
                                <el-button link>删除</el-button>
                            </template>
                        </el-popconfirm>
                        <el-button link>测试</el-button>
                        <el-button type="primary" link>测试长文字</el-button>
                        <el-button link>测试3</el-button>
                        <el-button type="primary" link>测试4</el-button>
                    </Operations>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="mt-0.5em justify-end"
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 50, 100]"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="sizeChange"
            @current-change="currentChange"
        />
        <CreateModify
            v-if="showCreateModify"
            :row="rows"
            @closed="showCreateModify = false"
            @refresh="getProcesses"
        />
    </div>
</template>
<script lang="ts" setup>
import CreateModify from './components/createModify.vue'
import { getProcessList } from '@/api/process'

const { pageNo, pageSize, total, currentChange, sizeChange } = usePagination()

const tableData = ref([])
const searchs = ref({
    userName: ''
})
const showCreateModify = ref(false)
const rows = ref({})

const create = () => {
    rows.value = {}
    showCreateModify.value = true
}

const modify = (row: any) => {
    console.log(row)
    rows.value = row
    showCreateModify.value = true
}

const loading = ref(false)
const getProcesses = (refresh?: boolean) => {
    if (refresh) {
        pageNo.value = 1
    }
    loading.value = true
    getProcessList({ pageNo: pageNo.value, pageSize: pageSize.value }, searchs.value)
        .then((res) => {
            console.log(res)
            tableData.value = res?.list || []
            total.value = res.total || 0
            loading.value = false
        })
        .catch((err) => {
            loading.value = false
        })
}

watch(
    () => pageNo.value,
    () => {
        getProcesses()
    }
)

watch(
    () => pageSize.value,
    () => {
        getProcesses(true)
    }
)

onMounted(() => {
    getProcesses(true)
})
</script>
<route lang="yaml">
meta:
    title: 流程设计列表
</route>
