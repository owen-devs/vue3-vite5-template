export function useElementAttrs(elementRef, attrs: Record<string, any>) {
    const refs = ref({})

    for (const a in attrs) {
        refs.value[a] = toRef(attrs[a] || elementRef.value?.[a] || {})
    }

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList' || mutation.type === 'attributes') {
                for (const a in attrs) {
                    refs.value[a].value = elementRef.value?.[a]
                }
            }
        }
    })

    onMounted(() => {
        observer.observe(elementRef.value, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeOldValue: true
            // attributeFilter: attrs
        })
    })

    onBeforeUnmount(() => {
        if (observer) {
            observer.disconnect()
        }
    })

    return refs.value
}
