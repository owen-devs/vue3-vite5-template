export function useDemo() {
    const demo = ref(0)
    const doubleDemo = computed(() => demo.value * 2)
    const showDoubleDemo = () => {
        console.log(doubleDemo.value)
    }
    return {
        demo,
        showDoubleDemo
    }
}
