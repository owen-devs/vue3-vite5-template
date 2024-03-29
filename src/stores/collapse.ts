export const useCollapseStore = defineStore('collapseStore', {
    state: () => ({
        isCollapse: false
    }),
    actions: {
        setCollapse(bool: boolean) {
            this.isCollapse = bool
        }
    }
})
