<template>
    <div ref="containerRef" class="w-100%">
        <div
            class="item-selector"
            v-for="(item, index) in data"
            :key="item.id"
            :style="{ height: item.height }"
        >
            {{ item.name }}
        </div>
    </div>
</template>
<script lang="ts" setup>
const containerRef = ref<HTMLElement | null>(null)
const { init, column, rowSpacing, columnSpacing, oddColumnBgColor, evenColumnBgColor } =
    useWaterFallLayout(containerRef, '.item-selector')

//指定行距
rowSpacing.value = 5
columnSpacing.value = 10
oddColumnBgColor.value = 'gray'
evenColumnBgColor.value = 'green'

const testData = []

for (let i = 0; i < 30; i++) {
    testData.push({
        id: i,
        name: i,
        height: Math.random() * 100 + 100 + 'px'
    })
}
const itemMinWidth = ref(350)
const { width } = useElementSize(containerRef)
let deWidth = ref(0)
watch(
    () => width.value,
    useDebounceFn((val) => {
        console.log(val)
        deWidth.value = val
    })
)

const colNum = computed(() => Math.floor(deWidth.value / itemMinWidth.value))

watch(
    () => colNum.value,
    (val) => {
        console.log(width.value)
        console.log(val)
        column.value = val
    }
)

//分页加载
const data = ref([])
const loading = ref(false)

const getList = () => {
    loading.value = true

    setTimeout(() => {
        data.value.push(...testData)
        init()
        loading.value = false
    }, 300)

    // getData()
    //     .then((res) => {
    //         const list = res?.list || []
    //         data.value.push(...list)
    //         init()
    //         loading.value = false
    //     })
    //     .catch((err) => {
    //         loading.value = false
    //     })
}

onMounted(() => {
    getList()
})
</script>
