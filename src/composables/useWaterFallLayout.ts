/**
 * @method 瀑布流布局组件
 * @param {Ref<HTMLElement | null>} containerRef -容器元素的 Ref
 * @param { string } itemSelector -要处理的子元素 选择器
 * @returns {Object} -初始化属性与方法
 * {
    init,               function - 初始化瀑布流布局
    column,             number - 瀑布流列数
    rowSpacing,         number - 瀑布流行间距
    columnSpacing,      number - 瀑布流列间距
    oddColumnBgColor,   string - 奇数列背景色
    evenColumnBgColor,  string - 偶数列背景色
    getItems            function - 获取瀑布流布局子元素
 * }
 *
 * @example:
 <template>
    <div
        ref="containerRef"
        class="w-100%"
    >
        <div
            class="item-selector"
            v-for="(item, index) in data"
            :key="item.id"
        >{{index}}</div>
    </div>
 </template>
 <script lang="ts" setup>
    const containerRef = ref<HTMLElement | null>(null)
    const { init, column, rowSpacing } = useWaterFallLayout(containerRef, '.item-selector')

    //指定列数
    column.value = 3

    //指定行距
    rowSpacing.value = 2

    //数据加载
    const data = ref([])
    const loading = ref(false)

    const getList = ()=>{
        loading.value = true
        getData().then((res)=>{
            const list = res?.list || []
            data.value.push(...list)
            init()
            loading.value = false
        }).catch((err)=>{
            loading.value = false
        })
    }

 </script>
 */
import { ref } from 'vue'
import type { Ref } from 'vue'

export function useWaterFallLayout(containerRef: Ref<HTMLElement | null>, itemSelector: string) {
    //初始化默认值
    const column = ref<number>(3)
    const rowSpacing = ref<number>(2)
    const columnSpacing = ref<number>(2)
    const oddColumnBgColor = ref<string>('#F5F8F8')
    const evenColumnBgColor = ref<string>('#FFFFFF')

    const transition = ref<string>('top 300ms ease-in-out, left 300ms ease-in-out')
    const containerWidth = ref<number>(0)
    const containerHeight = ref<number>(0)
    const columnWidth = ref<number>(0)

    const getItems = (selector?: string) =>
        document.querySelectorAll<HTMLElement>(selector || itemSelector)

    const setContainerPosition = () => {
        containerRef.value!.style.position = 'relative'
    }

    const useContainerWidth = () => {
        setContainerPosition()
        containerWidth.value = containerRef.value!.clientWidth
    }

    const useColumnWidth = () => {
        columnWidth.value =
            (containerWidth.value - columnSpacing.value * (column.value - 1)) / column.value
    }

    const getItemLeft = (index: number) => {
        const remain = index % column.value
        return remain === 0 ? 0 : remain * (columnWidth.value + columnSpacing.value)
    }

    //获取同列顶头的位置高度
    const getNextTop = (item: HTMLElement) => {
        const { style, offsetHeight } = item
        return parseFloat(style.top) + offsetHeight + rowSpacing.value
    }

    const getItemTop = (index: number, items: NodeListOf<HTMLElement>) => {
        if (index >= column.value) {
            return getNextTop(items[index - column.value])
        }
        return 0
    }

    const increaseContainerHeight = (item: HTMLElement) => {
        const newTop = getNextTop(item)
        if (newTop > containerHeight.value) {
            containerHeight.value = newTop
            containerRef.value!.style.height = newTop + 'px'
        }
    }

    const isDealed = ref('is-dealed')

    const useItemAttrs = (isRearrange: boolean = false) => {
        const items = getItems()
        const itemsDealed = getItems('.' + isDealed.value)

        //大数据量时，避免重复处理
        let startIndex: number = 0
        if (itemsDealed.length > 0) {
            startIndex = itemsDealed.length
        }

        if (isRearrange) {
            startIndex = 0
            containerHeight.value = 0
        }

        for (let i = startIndex; i < items.length; i++) {
            items[i].style.position = 'absolute'
            items[i].style.transition = transition.value
            items[i].style.width = columnWidth.value + 'px'
            items[i].style.backgroundColor = getItemBgColor(i)

            items[i].style.left = getItemLeft(i) + 'px'
            items[i].style.top = getItemTop(i, items) + 'px'

            items[i].classList.add(isDealed.value)

            increaseContainerHeight(items[i])
        }
    }

    const getItemBgColor = (i: number) => {
        const index = i + 1
        if (column.value % 2 === 0) {
            if (index % 2 === 0) {
                return evenColumnBgColor.value
            } else {
                return oddColumnBgColor.value
            }
        } else {
            if (index % column.value != 0 && (index % column.value) % 2 === 0) {
                return evenColumnBgColor.value
            } else {
                return oddColumnBgColor.value
            }
        }
    }

    const init = (isRearrange: boolean = false) => {
        useContainerWidth()
        useColumnWidth()
        nextTick(() => {
            useItemAttrs(isRearrange)
        })
    }

    watch(
        () => column.value,
        (val) => {
            nextTick(() => {
                init(true)
            })
        }
    )

    return {
        init,
        column,
        rowSpacing,
        columnSpacing,
        oddColumnBgColor,
        evenColumnBgColor,
        getItems
    }
}
