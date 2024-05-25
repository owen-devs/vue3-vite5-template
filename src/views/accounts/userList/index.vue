<template>
    <div class="uset-list-container">
        <div class="flex justify-between items-center">
            <h4>用户管理列表</h4>
            <div class="">
                <el-button type="primary" @click="createUser">
                    新建用户
                    <el-icon class="ml-0.5em"><i class="i-ph-plus-circle-light" /></el-icon>
                </el-button>
            </div>
        </div>
        <div class="flex justify-end items-center py-0.5em">
            <div class="flex-1"></div>
            <div>
                <el-input
                    v-model="searchs.name"
                    placeholder="请输入用户名"
                    @change="getUserList(true)"
                >
                    <template #append>
                        <el-button @click="getUserList(true)">
                            <el-icon><i class="i-ph-magnifying-glass" /></el-icon>
                        </el-button>
                    </template>
                </el-input>
            </div>
        </div>
        <el-table
            :data="tableData"
            :header-cell-style="{ height: '56px', 'font-size': '16px' }"
            style="width: 100%"
            :cell-style="{ height: '56px', 'font-size': '16px' }"
            v-loading="loading"
        >
            <el-table-column prop="name" label="姓名" min-width="100" />
            <el-table-column prop="account" label="账号" min-width="150" />
            <el-table-column prop="age" label="年龄" min-width="80" />
            <el-table-column prop="gender" label="性别" :formatter="formatGender" min-width="80" />
            <el-table-column prop="email" label="邮箱" min-width="150" />
            <el-table-column prop="createTime" label="创建时间" min-width="150" />
            <el-table-column prop="updateTime" label="最近更新时间" min-width="150" />
            <el-table-column label="操作" width="180">
                <template #default="{ row }">
                    <Operations :key="row.id">
                        <el-button type="primary" @click="editUser(row)" link>编辑</el-button>
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
            class="mt-0.5em justify-end text-16px"
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 50, 100]"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="sizeChange"
            @current-change="currentChange"
        />
        <AddUser
            v-if="showAddUser"
            :type="type"
            :row="rows"
            @closed="showAddUser = false"
            @refresh="getUserList"
        />
    </div>
</template>
<script lang="ts" setup>
import AddUser from './components/addUser.vue'
import { getUserListByPage, deleteUser } from '@/api/user'

const { pageNo, pageSize, total, currentChange, sizeChange } = usePagination()

const tableData = ref([])
const searchs = ref({
    name: ''
})
const showAddUser = ref(false)
const rows = ref({})
const type = ref('create')

const createUser = () => {
    type.value = 'create'
    showAddUser.value = true
}

const editUser = (row: any) => {
    console.log(row)
    type.value = 'update'
    rows.value = row
    showAddUser.value = true
}

const deleteUserr = (row: any) => {
    console.log(row)
    deleteUser({ id: row.id }).then((res) => {
        ElMessage.success('删除成功')
        getUserList()
    })
}

const loading = ref(false)
const getUserList = (refresh?: boolean) => {
    if (refresh) {
        pageNo.value = 1
    }
    loading.value = true
    getUserListByPage({ pageNo: pageNo.value, pageSize: pageSize.value }, searchs.value).then(
        (res) => {
            console.log(res)
            tableData.value = res?.list || []
            total.value = res.total || 0
            loading.value = false
        }
    )
}

const formatGender = (row: any) => {
    const genderMap = {
        '0': '男',
        '1': '女'
    }
    return row.gender == '0' || row.gender == '1' ? genderMap[row.gender] : row.gender
}

watch(
    () => pageNo.value,
    () => {
        getUserList()
    }
)

watch(
    () => pageSize.value,
    () => {
        getUserList(true)
    }
)

onMounted(() => {
    getUserList()
})
</script>
<route lang="yaml">
meta:
    title: 用户管理列表
</route>
