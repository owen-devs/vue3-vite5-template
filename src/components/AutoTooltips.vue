<template>
    <div v-if="props.text" class="w-full overflow-hidden">
        <el-tooltip
            placement="top"
            :content="props.text"
            :disabled="computedDisabled"
            v-bind="$attrs"
        >
            <div
                class="w-full"
                :class="[
                    { truncate: !props.rows || props.rows === 1, 'multi-lines': props.rows > 1 },
                    ...props.classNames
                ]"
                ref="wrapper"
                v-html="props.text"
            ></div>
        </el-tooltip>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    text: {
        type: String,
        default: ''
    },
    classNames: {
        type: Array,
        default: () => []
    },
    rows: {
        type: Number,
        default: 1
    }
})

const wrapper = ref()
const isDisabled = ref(true)
const computedDisabled = computed(() => !props.text || isDisabled.value)

const setDisabled = () => {
    isDisabled.value =
        !props.rows || props.rows === 1
            ? getOneRowDisabled()
            : wrapper.value?.offsetHeight >= wrapper.value?.scrollHeight
}

const getOneRowDisabled = () => {
    if (!wrapper.value) return true
    const range = document.createRange()
    range.selectNodeContents(wrapper.value)
    const { width: realWidth } = range.getBoundingClientRect()
    const { width: panelWidth } = wrapper.value.getBoundingClientRect()

    return realWidth <= panelWidth
}

const { width: wrapperWidth, height: wrapperHeight } = useElementSize(wrapper)

watchEffect(() => {
    if (wrapperWidth.value && wrapperHeight.value && props.text) {
        setDisabled()
    }
})

onUpdated(() => {
    setDisabled()
})
</script>
<style lang="scss" scoped>
.multi-lines {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: v-bind('rows');
    -webkit-line-clamp: v-bind('rows');
    -webkit-box-orient: vertical;
}
</style>
