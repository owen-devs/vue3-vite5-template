/**
 * v-resizable directive for Vue 3
 * Allows an element to be resized by dragging its edges or corners.
 * Usage:
 * <div v-resizable="{ minWidth: 100, minHeight: 50, maxWidth: 500, maxHeight: 400 }"></div>
 * Or programmatically:
 * import { applyResizable } from '@/directives/vResizable'
 * const destroy = applyResizable(element, { minWidth: 100, minHeight: 50 });
 * Call destroy() to remove resizable functionality.
 */

import { DirectiveBinding } from 'vue'

type Side = 'left' | 'right' | 'top' | 'bottom' | 'bottom-right'

interface ResizeOptions {
    minWidth?: number
    minHeight?: number
    maxWidth?: number
    maxHeight?: number
}

interface ResizeState {
    side?: Side
    startX: number
    startY: number
    startW: number
    startH: number
    startL: number
    startT: number
    minW: number
    minH: number
    maxW?: number
    maxH?: number
    pointerId?: number
    handlers: HTMLElement[]
    onMove?: (e: PointerEvent) => void
    onUp?: (e: PointerEvent) => void
    ro?: ResizeObserver
}

const HANDLE_SIZE = 4
const HANDLE_CLASS = 'v-resizable-handle'
const HANDLE_STYLE_ID = 'v-resizable-handle-style'

/** ensure global handle styles exist once */
function ensureStyles() {
    if (document.getElementById(HANDLE_STYLE_ID)) return
    const style = document.createElement('style')
    style.id = HANDLE_STYLE_ID
    style.textContent = `
.${HANDLE_CLASS} {
  position: absolute;
  background: transparent;
  z-index: 9999;
  user-select: none;
  touch-action: none;
  opacity: 0;
}
.${HANDLE_CLASS}::after {
  content: '';
  display:block;
  width:100%;
  height:100%;
  border-radius:2px;
  background: rgba(0,0,0,0.12);
}
.${HANDLE_CLASS}.hr { cursor: ew-resize; }
.${HANDLE_CLASS}.vr { cursor: ns-resize; }
.${HANDLE_CLASS}.corner { cursor: nwse-resize; }
`
    document.head.appendChild(style)
}
/** calculate handle size based on target element size */
function setHandleResize(className: string, el: HTMLElement, targetRect: DOMRect): HTMLElement {
    let width = 0,
        height = 0
    switch (className) {
        case 'hr':
            width = HANDLE_SIZE
            height = targetRect.height - HANDLE_SIZE * 2
            break
        case 'vr':
            width = targetRect.width - HANDLE_SIZE * 2
            height = HANDLE_SIZE
            break
        case 'corner':
            width = HANDLE_SIZE * 2
            height = HANDLE_SIZE * 2
            break
    }
    el.style.width = `${width}px`
    el.style.height = `${height}px`
    return el
}

/** create handle element */
function createHandle(className: string, h: HTMLElement): HTMLElement {
    const el = document.createElement('div')
    const targetRect = h.getBoundingClientRect()
    el.className = `${HANDLE_CLASS} ${className}`

    return setHandleResize(className, el, targetRect)
}

function setHandlePos(h: HTMLElement, side: Side, targetRect: DOMRect) {
    const half = HANDLE_SIZE / 2
    console.log(h, side, targetRect)
    switch (side) {
        case 'left':
            h.style.left = `${-half}px`
            h.style.top = `${HANDLE_SIZE}px`
            setHandleResize('hr', h, targetRect)
            break
        case 'right':
            h.style.left = `${targetRect.width - half}px`
            h.style.top = `${HANDLE_SIZE}px`
            setHandleResize('hr', h, targetRect)
            break
        case 'top':
            h.style.left = `${HANDLE_SIZE}px`
            h.style.top = `${-half}px`
            setHandleResize('vr', h, targetRect)
            break
        case 'bottom':
            h.style.left = `${HANDLE_SIZE}px`
            h.style.top = `${targetRect.height - half}px`
            setHandleResize('vr', h, targetRect)
            break
        case 'bottom-right':
            h.style.left = `${targetRect.width - half}px`
            h.style.top = `${targetRect.height - half}px`
            break
    }
}

/** core setup that can be used by directive or called programmatically */
function setupResizable(el: HTMLElement, opts?: ResizeOptions) {
    ensureStyles()

    // ensure positioning
    const computed = getComputedStyle(el)
    if (computed.position === 'static') {
        el.style.position = 'relative'
    }
    el.style.boxSizing = el.style.boxSizing || 'border-box'

    const state: ResizeState = {
        startX: 0,
        startY: 0,
        startW: 0,
        startH: 0,
        startL: 0,
        startT: 0,
        minW: opts?.minWidth ?? 40,
        minH: opts?.minHeight ?? 24,
        maxW: opts?.maxWidth,
        maxH: opts?.maxHeight,
        handlers: []
    }

    // create handles: left,right,top,bottom,bottom-right
    const left = createHandle('hr', el)
    const right = createHandle('hr', el)
    const top = createHandle('vr', el)
    const bottom = createHandle('vr', el)
    const br = createHandle('corner', el)

    left.dataset.side = 'left'
    right.dataset.side = 'right'
    top.dataset.side = 'top'
    bottom.dataset.side = 'bottom'
    br.dataset.side = 'bottom-right'

    el.appendChild(left)
    el.appendChild(right)
    el.appendChild(top)
    el.appendChild(bottom)
    el.appendChild(br)

    state.handlers.push(left, right, top, bottom, br)

    const onPointerDown = (evt: PointerEvent) => {
        const target = evt.target as HTMLElement
        if (!target || !target.dataset?.side) return
        const side = target.dataset.side as Side
        ;(evt.target as Element).setPointerCapture?.(evt.pointerId)

        state.side = side
        state.pointerId = evt.pointerId

        const rect = el.getBoundingClientRect()
        state.startX = evt.clientX
        state.startY = evt.clientY
        state.startW = rect.width
        state.startH = rect.height
        const style = getComputedStyle(el)
        const leftPx = parseFloat(style.left || '0')
        const topPx = parseFloat(style.top || '0')
        state.startL = leftPx
        state.startT = topPx

        state.onMove = (e: PointerEvent) => onPointerMove(e, el, state)
        state.onUp = (e: PointerEvent) => onPointerUp(e, el, state)

        window.addEventListener('pointermove', state.onMove!)
        window.addEventListener('pointerup', state.onUp!)
        window.addEventListener('pointercancel', state.onUp!)
        evt.preventDefault()
    }

    const onPointerMove = (e: PointerEvent, el: HTMLElement, s: ResizeState) => {
        if (s.side === undefined) return
        const dx = e.clientX - s.startX
        const dy = e.clientY - s.startY

        let newW = s.startW
        let newH = s.startH
        let newL = s.startL
        let newT = s.startT

        if (s.side === 'right') {
            newW = Math.max(s.minW, s.startW + dx)
            if (s.maxW) newW = Math.min(newW, s.maxW)
        } else if (s.side === 'left') {
            newW = Math.max(s.minW, s.startW - dx)
            if (s.maxW) newW = Math.min(newW, s.maxW)
            newL = s.startL + (s.startW - newW)
        } else if (s.side === 'bottom') {
            newH = Math.max(s.minH, s.startH + dy)
            if (s.maxH) newH = Math.min(newH, s.maxH)
        } else if (s.side === 'top') {
            newH = Math.max(s.minH, s.startH - dy)
            if (s.maxH) newH = Math.min(newH, s.maxH)
            newT = s.startT + (s.startH - newH)
        } else if (s.side === 'bottom-right') {
            newW = Math.max(s.minW, s.startW + dx)
            newH = Math.max(s.minH, s.startH + dy)
            if (s.maxW) newW = Math.min(newW, s.maxW)
            if (s.maxH) newH = Math.min(newH, s.maxH)
        }

        el.style.width = `${newW}px`
        el.style.height = `${newH}px`

        const pos = getComputedStyle(el).position
        if (pos === 'absolute' || pos === 'relative' || pos === 'fixed') {
            el.style.left = `${newL}px`
            el.style.top = `${newT}px`
        }

        const rect = el.getBoundingClientRect()
        s.handlers.forEach((h) => {
            const side = h.dataset.side as Side
            setHandlePos(h, side, rect)
        })

        e.preventDefault()
    }

    const onPointerUp = (_e: PointerEvent, _el: HTMLElement, s: ResizeState) => {
        if (s.onMove) {
            window.removeEventListener('pointermove', s.onMove)
            window.removeEventListener('pointerup', s.onUp!)
            window.removeEventListener('pointercancel', s.onUp!)
        }
        s.side = undefined
        s.pointerId = undefined
    }

    const refreshHandles = () => {
        const rect = el.getBoundingClientRect()
        state.handlers.forEach((h) => {
            const side = h.dataset.side as Side
            h.style.position = 'absolute'
            h.style.boxSizing = 'content-box'
            setHandlePos(h, side, rect)
        })
    }

    state.handlers.forEach((h) => h.addEventListener('pointerdown', onPointerDown))

    // observe size changes to reposition handles
    const ro = new ResizeObserver(refreshHandles)
    ro.observe(el)
    state.ro = ro

    // initial positioning
    refreshHandles()

    // return cleanup function
    const destroy = () => {
        state.handlers.forEach((h) => {
            h.removeEventListener('pointerdown', onPointerDown)
            if (h.parentElement === el) el.removeChild(h)
        })
        if (state.onMove) {
            window.removeEventListener('pointermove', state.onMove)
            window.removeEventListener('pointerup', state.onUp!)
            window.removeEventListener('pointercancel', state.onUp!)
        }
        if (state.ro) {
            state.ro.disconnect()
        }
    }

    return { destroy }
}

/** main directive */
const vResizable = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        // allow passing options via directive value
        const opts = binding.value as ResizeOptions | undefined
        const { destroy } = setupResizable(el, opts)
        ;(el as any).__v_resizable_cleanup = destroy
    },

    beforeUnmount(el: HTMLElement) {
        const cleanup = (el as any).__v_resizable_cleanup as (() => void) | undefined
        if (cleanup) {
            cleanup()
            delete (el as any).__v_resizable_cleanup
        }
    }
}

// programmatic API: 调用 setupResizable 返回的 destroy 可以用来清理
export function applyResizable(el: HTMLElement, options?: ResizeOptions) {
    const { destroy } = setupResizable(el, options)
    return destroy
}

export default vResizable
