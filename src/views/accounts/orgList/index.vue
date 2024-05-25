<template>
    <div class="uset-list-container">
        <div class="flex justify-between items-center">
            <h4>部门管理列表</h4>
            <div class="">
                <el-button type="primary" @click="createOrg">
                    新建部门
                    <el-icon class="ml-0.5em"><i class="i-ph-plus-circle-light" /></el-icon>
                </el-button>
            </div>
        </div>
        <div class="flex justify-end items-center py-0.5em">
            <div class="flex-1"></div>
            <div>
                <el-input
                    v-model="searchs.name"
                    placeholder="请输入部门名称"
                    @change="getOrgTopLists(true)"
                >
                    <template #append>
                        <el-button @click="getOrgTopLists(true)">
                            <el-icon><i class="i-ph-magnifying-glass" /></el-icon>
                        </el-button>
                    </template>
                </el-input>
            </div>
        </div>
        <el-table
            ref="tableRef"
            row-key="id"
            lazy
            :load="loadChilds"
            :data="tableData"
            style="width: 100%"
            v-loading="loading"
        >
            <el-table-column prop="name" label="部门名称" width="160" />
            <el-table-column prop="parentId" label="上级部门" width="160" />
            <el-table-column prop="createTime" label="创建时间" min-width="150" />
            <el-table-column prop="updateTime" label="最近更新时间" min-width="150" />
            <el-table-column prop="remark" label="备注" min-width="150" />
            <el-table-column label="操作" width="180">
                <template #default="{ row }">
                    <Operations :key="row.id">
                        <el-button type="primary" @click="editOrg(row)" link>编辑</el-button>
                        <el-popconfirm
                            title="确定要删除用户?"
                            width="180"
                            confirm-button-text="确定"
                            cancel-button-text="取消"
                            @confirm="() => deleteOrgg(row)"
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
        <AddOrg
            v-if="showAddOrg"
            :type="type"
            :row="rows"
            @closed="showAddOrg = false"
            @refresh="getOrgTopLists"
        />
    </div>
</template>
<script lang="ts" setup>
import AddOrg from './components/addOrg.vue'
import { deleteOrg, getOrgTree, getOrgSubList, getOrgTopList } from '@/api/org'

const { pageNo, pageSize, total, currentChange, sizeChange } = usePagination()

const tableData = ref([])
const searchs = ref({
    name: ''
})
const showAddOrg = ref(false)
const rows = ref({})
const type = ref('create')

const createOrg = () => {
    type.value = 'create'
    showAddOrg.value = true
}

const editOrg = (row: any) => {
    console.log(row)
    type.value = 'update'
    rows.value = row
    showAddOrg.value = true
}

const deleteOrgg = (row: any) => {
    console.log(row)
    deleteOrg({ id: row.id }).then((res) => {
        ElMessage.success('删除成功')
        getOrgTopLists()
    })
}

// const loading = ref(false)
// const getOrgList = (refresh?: boolean) => {
//     if (refresh) {
//         pageNo.value = 1
//     }
//     loading.value = true
//     getOrgListByPage({ pageNo: pageNo.value, pageSize: pageSize.value }, searchs.value).then(
//         (res) => {
//             console.log(res)
//             tableData.value = res?.list || []
//             total.value = res.total || 0
//             loading.value = false
//         }
//     )
// }

const tableRef = ref({})
const loading = ref(false)
const getOrgTopLists = (refresh = false) => {
    if (refresh) {
        pageNo.value = 1
    }
    loading.value = true
    tableRef.value.store.states.treeData.value = {} //解决树子节点不刷新的问题
    getOrgTopList({ pageNo: pageNo.value, pageSize: pageSize.value }, searchs.value).then((res) => {
        tableData.value = res?.list || []
        total.value = res.total || 0
        loading.value = false
    })
}

watch(
    () => pageNo.value,
    () => {
        getOrgTopLists()
    }
)

watch(
    () => pageSize.value,
    () => {
        getOrgTopLists(true)
    }
)

const loadChilds = (row: any, treeNode: Object, resolve: (data: any[]) => void) => {
    getOrgSubList({ orgId: row.id }).then((res) => {
        resolve(res || [])
    })
}

onMounted(() => {
    getOrgTopLists()
})
</script>
<route lang="yaml">
meta:
    title: 部门管理列表
</route>
