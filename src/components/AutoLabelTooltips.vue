<template>
    <el-tooltip placement="top" :disabled="isDisabled" v-bind="$attrs">
        <template #content>
            <div class="">
                <el-tag
                    type="primary"
                    class="mr-5px mb-5px"
                    :disable-transitions="true"
                    v-for="tag in tagsMap"
                >
                    {{ tag.name }}
                </el-tag>
            </div>
        </template>
        <div ref="wrapper" class="w-full overflow-hidden" :class="$attrs.class">
            <div ref="inner" class="flex flex-col w-fit">
                <div
                    v-for="(row, rowIndex) in visibleTags"
                    :key="row.id"
                    class="w-fit flex ws-nowrap break-keep items-center label-tags"
                    :class="{ 'mb-5px': rowIndex !== visibleTags.length - 1 }"
                >
                    <el-tag
                        type="primary"
                        v-for="item in row.children"
                        :key="item.name"
                        class="mr-5px"
                        :disable-transitions="true"
                    >
                        {{ item.name }}
                    </el-tag>
                    <el-tag v-if="row.isOvered" type="info" :disable-transitions="true">
                        +{{ remainCount }}
                    </el-tag>
                </div>
            </div>
        </div>
    </el-tooltip>
</template>
<script lang="ts" setup>
/**
 * 多行标签组件，超出显示剩余标签数
 */
const props = defineProps({
    tags: {
        type: Array<string | number | boolean>,
        default: () => []
    },
    rows: {
        type: Number,
        default: 3
    },
    debounceDelay: {
        type: Number,
        default: 10
    }
})

const tagsMap = computed(() => [...props.tags.map((v) => ({ name: v }))])
const wrapper = ref()
const inner = ref()

const { width: wrapperWidth } = useElementSize(wrapper)
const { width: innerWidth } = useElementSize(inner)

watchEffect(() => {
    if (wrapperWidth.value && innerWidth.value) {
        doShowTags()
    }
})

const checkedOverd = () => inner.value?.offsetWidth > wrapper.value?.offsetWidth

const visibleTags = ref<any[]>([])
const remainCount = ref<number>(0)
const isDisabled = computed(() => remainCount.value === 0)

const showTags = () => {
    nextTick(async () => {
        visibleTags.value = []
        let j = 0,
            i = 0

        for (; i < tagsMap.value.length; i++) {
            if (!visibleTags.value[j]) {
                visibleTags.value[j] = {
                    children: toRef([]).value,
                    id: `row_${Date.now()}_${j}`,
                    isOvered: false
                }
            }
            visibleTags.value[j].children.push(tagsMap.value[i])
            await nextTick()
            if (checkedOverd()) {
                visibleTags.value[j].children.splice(-1, 1)
                await nextTick()
                if (j >= props.rows - 1) {
                    visibleTags.value[j].isOvered = true
                    await nextTick()
                    if (checkedOverd()) {
                        visibleTags.value[j].children.splice(-1, 1)
                        await nextTick()
                        i--
                    }
                    remainCount.value = tagsMap.value.length - i
                    break
                } else {
                    visibleTags.value[j].isOvered = false
                    remainCount.value = 0
                }
                i--
                j++
            } else {
                visibleTags.value[j].isOvered = false
                remainCount.value = 0
            }
        }
    })
}

const doShowTags = useDebounceFn(showTags, props.debounceDelay)

watch(
    () => tagsMap.value,
    () => {
        doShowTags()
    }
)
</script>
<style lang="scss" scoped>
.label-tags {
    :deep() {
        .el-tag {
            @apply border-base c-dark6;
        }
    }
}
</style>
