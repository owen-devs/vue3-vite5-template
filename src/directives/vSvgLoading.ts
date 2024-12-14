import svgContent from '@/assets/svgLoading.ts'

interface LoadingOptions {
    svgClass: string
    svgContent: string | HTMLElement
    svgViewBox: string
    markBgColor: string
    markClass: string
    spinnerClass: string
    spinnerH: number
    spinnerContent: string | HTMLElement
    zIndex: number
}

const loadingNo = ref<number>(1000)
const zIndex = ref<number>(2000)
export const vSvgLoading = {
    mounted(el: HTMLElement, binding: any, vNode: any, preVnode: any) {
        const createLoading = (el: HTMLElement, binding: any, vNode: any) => {
            const defaults: LoadingOptions = {
                svgClass: '',
                svgContent,
                svgViewBox: '', //min-x min-y width height
                markBgColor: 'rgba(255,255,255,0.8)',
                markClass: '',
                spinnerClass: '',
                spinnerH: 300,
                spinnerContent: '',
                zIndex: zIndex.value++
            }

            const args = Object.assign({}, defaults, binding?.arg || {})
            const markDefaultStyle = `background-color:${args.markBgColor};top:0;right:0;bottom:0;left:0;margin:0;position:absolute;transition:opacity 0.3s;overflow: hidden;`
            const spinnerStyle = `position:absolute;text-align:center;left:50%;top:50%;width:100%;height:${args.spinnerH}px;`
            const markEl = document.createElement('div')
            const spinnerEl = document.createElement('div')

            loadingNo.value++

            markEl.className = `svg-loading ${args.markClass} uid-${loadingNo.value}`
            spinnerEl.className = `svg-loading-spinner ${args.spinnerClass}`
            spinnerEl.innerHTML = `${args.svgContent}`

            const svgEl = spinnerEl.getElementsByTagName('svg')[0]
            if (args.spinnerH) {
                svgEl.setAttribute('width', `${args.spinnerH}px`)
                svgEl.setAttribute('height', `${args.spinnerH}px`)
            }

            if (args.svgClass) {
                svgEl.setAttribute('class', args.svgClass)
            }

            if (args.svgViewBox) {
                svgEl.setAttribute('viewBox', args.svgViewBox)
            }

            vNode.ctx.markSelector = '.svg-loading'

            if (args.spinnerContent) {
                const spinnerTextEl = document.createElement('div')
                spinnerTextEl.setAttribute('style', 'text-align:center;')
                spinnerTextEl.innerHTML = args.spinnerContent
                spinnerEl.appendChild(spinnerTextEl)
            }

            spinnerEl.setAttribute('style', spinnerStyle)
            spinnerEl.style.setProperty('margin-top', `${-(args.spinnerH / 2)}px`)
            spinnerEl.style.setProperty('margin-left', `${-(args.spinnerH / 2)}px`)
            markEl.setAttribute('style', markDefaultStyle)
            markEl.style.setProperty('z-index', args.zIndex)
            markEl.appendChild(spinnerEl)

            el.style.setProperty('position', 'relative')
            el.appendChild(markEl)
        }

        const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

        const fadeOut = (el: HTMLElement, duration: number = 150) => {
            const startTime = performance.now()
            const step = (currentTime: number) => {
                const elapsedTime = currentTime - startTime
                if (elapsedTime >= duration) {
                    el.style.setProperty('opacity', '0')
                    el?.remove()
                    return
                }

                const easeProgress = !duration ? 1 : easeOutCubic(elapsedTime / duration)
                el.style.setProperty('opacity', String(1 - easeProgress))
                requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
        }

        vNode.ctx.fadeOut = fadeOut
        vNode.ctx.createLoading = createLoading
        binding.value && createLoading(el, binding, vNode)
    },
    updated(el: HTMLElement, binding: any, vNode: any, preVnode: any) {
        if (binding.value != binding.oldValue) {
            const markSelector = el.querySelector(vNode.ctx.markSelector)
            if (!binding.value) {
                markSelector && vNode.ctx.fadeOut(markSelector)
            } else {
                !markSelector && vNode.ctx.createLoading(el, binding, vNode)
            }
        }
    }
}
