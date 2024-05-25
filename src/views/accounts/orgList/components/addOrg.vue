<template>
    <div>
        <el-drawer
            size="680px"
            append-to-body
            v-model="showDrawer"
            :title="title"
            :direction="direction"
            @closed="$emit('closed')"
        >
            <el-form ref="formRef" :model="forms" label-width="100px" :rules="rules">
                <el-form-item label="部门名称" prop="name">
                    <el-input v-model="forms.name" placeholder="请输入部门名称"></el-input>
                </el-form-item>
                <el-form-item label="上级部门" prop="parentId">
                    <el-cascader
                        v-model="forms.parentId"
                        :options="options"
                        :props="cascaderProps"
                        clearable
                        filterable
                        placeholder="不填写默认为顶级部门"
                        :show-all-levels="false"
                    />
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="forms.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">提交</el-button>
                    <el-button @click="handleCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>
<script lang="ts" setup>
const emits = defineEmits(['refresh', 'closed'])
import { getOrgInfo, createOrg, updateOrg, getOrgTree } from '@/api/org'

const props = defineProps({
    row: {
        type: Object,
        default: () => ({})
    },
    type: {
        type: String,
        default: 'create'
    }
})

const showDrawer = ref(true)
const direction = 'rtl'
const title = computed(() => (props.type === 'create' ? '新建部门' : '编辑部门'))
const isUpdate = computed(() => !!props.row?.id)
const formRef: Ref = ref(null)

const forms = ref({
    id: '',
    name: '',
    parentId: '',
    remark: ''
})

const rules = ref({
    name: [
        { required: true, message: '请输入部门名称', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur' }
    ]
})

//要做部门树
const options = ref([])
const cascaderProps = {
    label: 'name',
    value: 'id',
    emitPath: false,
    checkStrictly: true
}

//递归过滤
const filtersOrg = (list: any[], ids: string[]) => {
    list.forEach((item, index) => {
        if (ids.includes(item.id)) {
            list.splice(index, 1)
        } else {
            if (item?.children?.length > 0) {
                filtersOrg(item.children, ids)
            }
        }
    })
    return list
}

const getOrgTrees = () => {
    getOrgTree().then((res) => {
        const temp = res || []
        options.value = isUpdate.value ? filtersOrg(temp, [props.row.id]) : temp
    })
}

watch(
    () => forms.value.parentId,
    (val) => {
        console.log(val)
        forms.value.parentId = val || ''
    }
)

const getDetail = () => {
    if (props.type === 'update') {
        getOrgInfo({ id: props.row.id }).then((res) => {
            forms.value = res || {}
            console.log(forms.value)
        })
    }
}

const handleSubmit = () => {
    formRef.value.validate((valid: boolean) => {
        if (valid) {
            if (props.type === 'update' && forms.value.id) {
                updateOrg(forms.value).then((res) => {
                    ElMessage.success('更新成功')
                    showDrawer.value = false
                    emits('refresh')
                })
            } else {
                createOrg(forms.value).then((res) => {
                    ElMessage.success('创建成功')
                    showDrawer.value = false
                    emits('refresh')
                })
            }
        }
    })
}
const handleCancel = () => {
    showDrawer.value = false
}

onMounted(() => {
    isUpdate.value && getDetail()
    getOrgTrees()
})
</script>
