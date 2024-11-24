<template>
    <el-tooltip placement="top" :disabled="!props.text || isDisabled" v-bind="$attrs">
        <template #content>
            <div class="" v-text="props.text"></div>
        </template>
        <div
            class="w-full"
            :class="
                [
                    $attrs.class,
                    { truncate: !props.rows || props.rows === 1, 'multi-lines': props.rows > 1 }
                ].concat(props.classNames)
            "
            ref="wrapper"
            v-text="props.text"
        ></div>
    </el-tooltip>
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
const setDisabled = () => {
    isDisabled.value =
        !props.rows || props.rows === 1
            ? wrapper.value.offsetWidth >= wrapper.value.scrollWidth
            : wrapper.value.offsetHeight >= wrapper.value.scrollHeight
}

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
