export function usePagination(pagination?: Pagination) {
    const total = ref(0)
    const pageSize = ref(pagination?.pageSize || 10)
    const pageNo = ref(1)

    function sizeChange(size: number) {
        pageNo.value = 1
        pageSize.value = size
    }

    function currentChange(num: number) {
        pageNo.value = num
    }

    return {
        total,
        pageSize,
        pageNo,
        currentChange,
        sizeChange
    }
}
