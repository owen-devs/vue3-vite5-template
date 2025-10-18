<template>
    <div>
        <el-dialog
            class="v-resizable-dialog"
            @opened="opened"
            v-model="showDialog"
            title="Tips"
            width="500"
            @closed="closed"
        >
            <span>This is a message</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="showDialog = false">Cancel</el-button>
                    <el-button type="primary" @click="showDialog = false">Confirm</el-button>
                </div>
            </template>
        </el-dialog>

        <el-button @click="showDialog = true">打开可以拖拽改变宽高的弹窗</el-button>
    </div>
</template>
<script lang="ts" setup>
import { applyResizable } from '@/directives/vResizable'

const showDialog = ref<boolean>(false)

let destroyFn: (() => void) | null = null
const opened = () => {
    console.log(document.querySelector('.v-resizable-dialog'))
    destroyFn = applyResizable(document.querySelector('.v-resizable-dialog'), {
        minWidth: 100,
        minHeight: 50
    })
}

const closed = () => {
    destroyFn && destroyFn()
}

onBeforeUnmount(() => {
    if (destroyFn) {
        destroyFn()
    }
})
</script>
<style lang="scss" scoped></style>
