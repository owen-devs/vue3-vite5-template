declare interface Pagination {
    pageNo: number
    pageSize: number
    total: number
}

declare interface ResultVo {
    code: number
    success: boolean
    msg: string
    result: Object
}
