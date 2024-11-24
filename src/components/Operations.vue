<template>
    <div class="w-100% inline-flex overflow-hidden" ref="wrapper">
        <div ref="inner" class="w-auto ws-nowrap break-keep inline-flex items-center">
            <component :is="item" v-for="(item, index) in commonBtns" :key="'comm_' + index" />
            <el-dropdown v-if="isOvered && moreBtns.length > 0">
                <span class="text-0.95em pl-10px hover:cursor-pointer more-btn">更多</span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            v-for="(item, i) in moreBtns"
                            :key="'more_' + i"
                            class="operation-dropdown-list-item"
                        >
                            <component :is="item" :key="'more_comp_' + i" />
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts" setup>
/**
 * @description:常用于table表格操作列按钮组，超出列宽自动出现[更多]下拉菜单
 */

defineProps({
    key: {
        type: Object,
        default: Date.now()
    }
})

const wrapper = ref<HTMLElement | null>(null)
const inner = ref<HTMLElement | null>(null)
const slots: Readonly<any> = useSlots()
let slotsNode: VNode[] = slots?.default()

const isExcludeNode = ({ props }: VNode) => {
    props = props || {}
    const camelKebad = ['is-exclude', 'isExclude']
    const hasKey = Object.keys(props).find((k) => camelKebad.includes(k))
    return !!hasKey && props[hasKey] !== false
}
slotsNode = slotsNode.filter(
    (node) =>
        node &&
        !isExcludeNode(node) &&
        node.type.toString() !== 'Symbol(Comment)' &&
        node.type.toString() !== 'Symbol()' &&
        node.type.toString() !== 'Symbol(v-cmt)'
)

const commonBtns = ref<VNode[]>([])
const moreBtns = ref<VNode[]>([])
const isOvered = ref<Boolean>(false)

const checkOvered = () => inner.value?.offsetWidth > wrapper.value?.offsetWidth

const { width: wrapperWidth } = useElementSize(wrapper, { width: 0, height: 0 })
const { width: innerWidth } = useElementSize(inner, { width: 0, height: 0 })

watchEffect(() => {
    if (wrapperWidth.value && innerWidth.value) {
        btnSplit()
    }
})

const btnSplit = async () => {
    commonBtns.value = []
    let moreLen = 0,
        i = 0,
        j = 0,
        len = slotsNode.length

    for (; i < len; i++) {
        if (!slotsNode[i]) {
            continue
        }
        commonBtns.value.push(slotsNode[i])
        await nextTick()

        if (checkOvered()) {
            commonBtns.value.splice(-1, 1)
            isOvered.value = true

            await nextTick()

            moreLen = len - i + 1
            j = i

            if (checkOvered()) {
                commonBtns.value.splice(-1, 1)
                j = i - 1
            }

            break
        }
    }

    if (moreLen > 0) {
        moreBtns.value = []
        for (; j < len; j++) {
            if (!slotsNode[j]) {
                continue
            }
            moreBtns.value.push(slotsNode[j])
        }
        isOvered.value = true
    } else {
        isOvered.value = false
    }
}

onMounted(() => {
    btnSplit()
})
</script>

<style lang="scss" scoped>
.operation-dropdown-list-item {
    padding: 0 16px;

    button,
    .el-button {
        width: 100%;
        padding: 9px 0;
        text-align: left;
        margin: 0;
        justify-content: flex-start;
    }
}
.more-btn {
    &:focus-visible {
        outline: none;
    }
}
</style>
