<template>
    <div class="wrapper-content-container" ref="wrapper">
        <div ref="inner" class="inner-content-container">
            <component :is="item" v-for="(item, index) in commonBtns" :key="'comm_' + index" />
            <el-dropdown v-if="isOvered">
                <span class="more-btn">更多</span>
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

const wrapper = ref<HTMLElement>()
const inner = ref<HTMLElement>()
const slots: Readonly<any> = useSlots()
const slotsNode = computed<VNode[]>(
    () =>
        slots
            ?.default?.()
            ?.filter(
                (node) =>
                    node &&
                    !isExcludeNode(node) &&
                    node.type.toString() !== 'Symbol(Comment)' &&
                    node.type.toString() !== 'Symbol()' &&
                    node.type.toString() !== 'Symbol(v-cmt)'
            ) ?? []
)

const isExcludeNode = ({ props }: VNode) => {
    props = props || {}
    const camelKebad = ['is-exclude', 'isExclude', 'exclude']
    const hasKey = Object.keys(props).find((k) => camelKebad.includes(k))
    return !!hasKey && props[hasKey] !== false
}

const commonBtns = ref<VNode[]>([])
const moreBtns = ref<VNode[]>([])
const isOvered = ref<Boolean>(false)

const checkOvered = (): boolean => {
    return inner.value?.offsetWidth > wrapper.value?.offsetWidth
}

const { width: wrapperWidth } = useElementSize(wrapper, { width: 0, height: 0 })
const { width: innerWidth } = useElementSize(inner, { width: 0, height: 0 })

watchEffect(() => {
    if (wrapperWidth.value && innerWidth.value && slotsNode.value) {
        btnSplit()
    }
})

const btnSplit = async () => {
    commonBtns.value = []
    let moreLen = 0,
        i = 0,
        j = 0,
        len = slotsNode.value.length

    for (; i < len; i++) {
        if (!slotsNode.value[i]) {
            continue
        }
        commonBtns.value.push(slotsNode.value[i])
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
            if (!slotsNode.value[j]) {
                continue
            }
            moreBtns.value.push(slotsNode.value[j])
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
.wrapper-content-container {
    @apply w-100% inline-flex overflow-hidden;
}
.inner-content-container {
    @apply w-auto ws-nowrap break-keep inline-flex items-center;
}

.more-btn {
    @apply text-0.95em pl-10px cursor-pointer;
    &:focus-visible {
        outline: none;
    }
}
</style>
<style lang="scss">
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
</style>
