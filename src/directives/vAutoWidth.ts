/**
 * 元素宽度随文本自适应
 * @example
 * const args = {
 *  target:'.el-select__wrapper',
 *  offset:20,
 *  min:'',
 *  max:''
 * }
 * <el-select v-auto-width:[args]="label"></el-select>
 */
const defaults: Record<string, IterableObject> = {
    'el-select': {
        target: '.el-select__wrapper',
        offset: 20,
        min: undefined,
        max: undefined
    },
    'el-input': {
        target: '.el-input__wrapper',
        offset: 0,
        min: undefined,
        max: undefined
    }
}

export const vAutoWidth = {
    mounted(el: HTMLElement, binding: any, vnode: any, prevVnode: any) {
        const doUnit = (val: number | string) => {
            return typeof val === 'number' ? val + 'px' : val
        }

        const getArgsByType = (el: HTMLElement, record: Record<string, IterableObject>) => {
            const type = Object.keys(record).find((k) => el.classList.contains(k))
            return type ? record[type] : {}
        }

        const args = Object.assign({}, binding.arg || {}, getArgsByType(el, defaults))

        const getElAllWidth = (spanEl: HTMLElement, args?: IterableObject) => {
            const baseWidth = parseFloat(getComputedStyle(spanEl).width) || 0
            console.log(baseWidth)
            return args?.offset ? baseWidth + args.offset + 'px' : baseWidth + 'px'
        }

        const spanClass = `auto-width-${vnode.ctx.uid}`,
            spanEl = document.createElement('span')

        el.style.position = 'relative'
        spanEl.style.position = 'absolute'
        spanEl.style.height = '0px'
        spanEl.style.zIndex = '-9999'
        spanEl.style.right = '-9999px'
        spanEl.style.top = '0px'
        spanEl.style.visibility = 'hidden'
        spanEl.style.opacity = '0'
        spanEl.style.display = 'inline-block'
        spanEl.style.setProperty('word-break', 'keep-all')
        spanEl.style.setProperty('white-space', 'nowrap')

        spanEl.innerText = binding.value
        spanEl.className = spanClass
        vnode.ctx.spanClass = spanClass
        vnode.ctx.doUnit = doUnit
        vnode.ctx.getElAllWidth = getElAllWidth
        vnode.ctx.args = args

        el.appendChild(spanEl)

        const styleKeys = [
            'paddingLeft',
            'paddingRight',
            'borderLeft',
            'borderRight',
            'outlineWidth',
            'fontWeight',
            'fontSize',
            'boxSizing'
        ]

        vnode.ctx.ctx.$nextTick(() => {
            const target = el.querySelector(args.target),
                styles = getComputedStyle(target)

            styleKeys.forEach((s: string) => {
                spanEl.style[s] = styles[s]
            })

            target.style.width = '100%'
            el.style.width = getElAllWidth(spanEl, args)
            if (args.min) {
                el.style.minWidth = doUnit(args.min)
            }
            if (args.max) {
                el.style.maxWidth = doUnit(args.max)
            }
        })
    },
    updated(el: HTMLElement, binding: IterableObject, vnode: any, prevVnode: any) {
        console.log(binding.value)
        if (binding.value !== binding.oldValue) {
            const spanEl = el.querySelector<HTMLElement>('.' + vnode.ctx.spanClass)
            if (spanEl) {
                spanEl.innerText = binding.value
                vnode.ctx.ctx.$nextTick(() => {
                    el.style.width = vnode.ctx.getElAllWidth(spanEl, vnode.ctx.args)
                })
            }
        }
    }
}
