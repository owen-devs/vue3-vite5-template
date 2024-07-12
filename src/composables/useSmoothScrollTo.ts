import { ElScrollbar } from 'element-plus'
import type { Ref } from 'vue'
/**
 * el-scrollbar 手动滚动动画
 * @param scrollbarRef el-scrollbar的ref对象
 * @param endY 竖向滚动目标位置，不滚动请设置为0
 * @param endX 横向滚动目标位置，不滚动请设置为0
 * @param duration 动画时长(ms)
 * @example
 * <div class="flex items-stretch">
 *      <div @click="clickBar(item)" v-for="item in navs">
 *          {{item.label}}
 *      </div>
 *      <el-scrollbar ref="scrollbar" :height="700">
 *          <div style="height: 1000px;background-color: blue;" :id="item.value" v-for="item in navs"></div>
 *      </el-scrollbar>
 * </div>
 *
 * const scrollbar = ref()
 * const navs = [{label: "模块一",value: 'first'}, {label: "模块二",value: 'second'}]
 *
 * const clickBar = (item:Record<string, any>)=>{
 *      const dom = document.querySelector<HTMLElement>("#"+item.value)
 *      useSmoothScrollTo(scrollbar, dom?.offsetTop, 0, 300)
 * }
 */
export function useSmoothScrollTo(
    scrollbarRef: Ref<InstanceType<typeof ElScrollbar>> | InstanceType<typeof ElScrollbar>,
    endY: number,
    endX: number = 0,
    duration: number = 300
) {
    const scrollbar = isRef(scrollbarRef) ? scrollbarRef.value : scrollbarRef
    const wrapRef: HTMLElement = scrollbar.wrapRef
    const startX = wrapRef?.scrollLeft || 0
    const startY = wrapRef?.scrollTop || 0
    const disX = endX - startX
    const disY = endY - startY
    const startTime = performance.now()

    const easeOutCubic = (t: number) => 1 - Math.row(1 - t, 3)
    const step = (currentTime: number) => {
        const elapsedTime = currentTime - startTime
        if (elapsedTime >= duration) {
            scrollbar.setScrollTop(endY)
            scrollbar.setScrollLeft(endX)
            return
        }

        const easeProgress = !duration ? 1 : easeOutCubic(elapsedTime / duration)
        scrollbar.setScrollTop(startY + disY * easeProgress)
        scrollbar.setScrollLeft(startX + disX * easeProgress)
        requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
}
