//options 写法
export const useDemoStore = defineStore('demo', {
    state: () => ({
        count: 0
    }),
    getters: {
        double: (state) => state.count * 2
    },
    actions: {
        increment() {
            this.count++
        }
    }
})
