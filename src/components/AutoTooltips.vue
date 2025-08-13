<template>
    <div v-if="props.text" class="w-full overflow-hidden">
        <el-tooltip placement="top" :content="props.text" :disabled="finalDisabled" v-bind="$attrs">
            <div
                class="w-full"
                :class="
                    [
                        $attrs.class,
                        { truncate: !props.rows || props.rows === 1, 'multi-lines': props.rows > 1 }
                    ].concat(props.classNames)
                "
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
const finalDisabled = computed(() => !props.text || isDisabled.value)

const getOneRowDisabled = (): boolean => {
    const { fontSize, fontFamily, fontWeight } = getComputedStyle(wrapper.value)
    const el = document.createElement('div')
    el.style = `position:absolute;
                left:100px;
                top:100px;
                white-space:nowrap;
                word-break:keep-all;
                font-size:${fontSize};
                font-family:${fontFamily};
                font-weight:${fontWeight};`

    el.innerHTML = props.text || ''
    document.body.appendChild(el)
    const realWidth = el.getBoundingClientRect()?.width
    const visibleWidth = wrapper.value.getBoundingClientRect()?.width
    document.body.removeChild(el)
    return realWidth <= visibleWidth
}

const setDisabled = () => {
    isDisabled.value =
        !props.rows || props.rows === 1
            ? getOneRowDisabled()
            : wrapper.value.offsetHeight >= wrapper.value.scrollHeight
}

const { width: wrapperWidth, height: wrapperHeight } = useElementSize(wrapper)

watchEffect(() => {
    if (wrapperWidth.value && wrapperHeight.value) {
        doSetDisabled()
    }
})

const doSetDisabled = useDebounceFn(setDisabled, 10)

onUpdated(() => {
    doSetDisabled()
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
