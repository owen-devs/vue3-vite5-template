<template>
    <div>
        <el-drawer
            size="800px"
            append-to-body
            v-model="showDrawer"
            :title="title"
            :direction="direction"
            @closed="$emit('closed')"
        >
            <el-form ref="formRef" :model="forms" label-width="100px" :rules="rules">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="forms.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="userAccount">
                    <el-input
                        :disabled="props.type == 'update'"
                        v-model="forms.userAccount"
                        placeholder="请输入账号"
                    ></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="userGender">
                    <el-select v-model="forms.userGender" placeholder="请选择">
                        <el-option label="男" value="1" />
                        <el-option label="女" value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input-number
                        v-model="forms.age"
                        :min="1"
                        :max="150"
                        placeholder="请输入年龄"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="forms.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-if="props.type == 'create'">
                    <el-input
                        type="password"
                        v-model="forms.password"
                        placeholder="请输入密码"
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword" v-if="props.type == 'create'">
                    <el-input
                        type="password"
                        v-model="forms.confirmPassword"
                        placeholder="请再次输入密码"
                    ></el-input>
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
import { getUserInfo, createUser, updateUser } from '@/api/user'
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
const title = computed(() => (props.type === 'create' ? '新建用户' : '编辑用户'))
const formRef = ref(null)

const forms = ref({
    userId: '',
    userName: '',
    password: '',
    confirmPassword: '',
    email: '',
    userGender: '1',
    age: 1,
    userAccount: ''
})

const rules = ref({
    userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur' }
    ],
    userAccount: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur' }
    ],
    userGender: [{ required: true, message: '请选择', trigger: 'blur' }],
    age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在6到20个字符', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在6到20个字符', trigger: 'blur' }
    ]
})

const getDetail = () => {
    if (props.type === 'update') {
        getUserInfo({ userId: props.row.userId }).then((res) => {
            forms.value = res || {}
        })
    }
}

const handleSubmit = () => {
    formRef?.value.validate((valid: boolean) => {
        if (valid) {
            if (props.type === 'update' && forms.value.userId) {
                updateUser(forms.value).then((res) => {
                    ElMessage.success('更新成功')
                    showDrawer.value = false
                    emits('refresh')
                })
            } else {
                createUser(forms.value).then((res) => {
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
    getDetail()
})
</script>
