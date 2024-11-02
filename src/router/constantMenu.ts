import { deepClone } from '@/utils'
export const menus = [
    {
        path: '/theme',
        title: '主题切换',
        icon: 'i-ph-dots-three-circle-vertical-fill'
    },
    {
        path: '/accounts',
        title: '账号管理',
        icon: 'i-ph-user-list-duotone',
        children: [
            {
                path: '/accounts/userList',
                title: '用户管理',
                icon: 'i-ph-user-list-duotone'
            },
            {
                path: '/accounts/orgList',
                title: '部门管理',
                icon: 'i-ph-user-list-duotone'
            }
        ]
    },
    {
        path: '/detail',
        title: '用户个人详情',
        icon: 'i-ph-dots-three-circle-vertical-fill'
    },
    {
        path: '/compoDemo',
        title: '组件演示',
        icon: 'i-ph-dots-three-circle-vertical-fill',
        children: [
            {
                path: '/compoDemo/waterfallLayout',
                title: '瀑布流布局',
                icon: 'i-ph-dots-three-circle-vertical-fill'
            },
            {
                path: '/compoDemo/trafficLight',
                title: '交通信号灯',
                icon: 'i-ph-dots-three-circle-vertical-fill'
            }
        ]
    },
    {
        path: '/sass',
        title: 'sass自定义',
        icon: 'i-ph-dots-three-circle-vertical-fill',
        children: [
            {
                path: '/sass/btnTypes',
                title: '按钮批量生成',
                icon: 'i-ph-dots-three-circle-vertical-fill'
            },
            {
                path: '/sass/circleMenus',
                title: '环形菜单',
                icon: 'i-ph-dots-three-circle-vertical-fill'
            }
        ]
    },
    {
        title: '无限菜单',
        path: '/loop',
        icon: 'i-ph-list-bullets-duotone',
        children: [
            {
                path: '/demo',
                title: '二级示例页-有下级',
                children: [
                    {
                        path: '/demo/child',
                        title: '三级菜单有下级',
                        children: [
                            {
                                path: '/demo/child/sub',
                                title: '四级菜单'
                            }
                        ]
                    },
                    {
                        path: '/demo/child2',
                        title: '三级菜单没下级'
                    }
                ]
            },
            {
                path: '/demo2',
                title: '二级示例页2-没下级'
            }
        ]
    }
]

let tempMenus = deepClone(menus)

const doDeepFilterMenus = (arr: any[], child: string) => {
    arr.forEach((item, index) => {
        if (item?.meta?.hidden) {
            arr.splice(index, 1)
        }
        if (item[child] && item[child].length > 0) {
            doDeepFilterMenus(item[child], child)
        }
    })
    return arr
}

export const filterMenus = doDeepFilterMenus(tempMenus, 'children')

/**
 * 菜单扁平化以及设置面包屑
 * @param {Array} arr 菜单原始数据
 * @param {string} key 子级的菜单字段名称
 * @param {Array} breadcrumb 父级的面包屑
 * @returns {Array} 扁平化后的带有面包屑的菜单数据
 */
export function flattenFilter(arr: any[], key: string, breadcrumb: never[]) {
    let result: any[] = []
    arr.forEach((item) => {
        item.breadcrumb = [].concat(breadcrumb, [{ title: item.title, path: item.path }])
        result.push(item)
        if (item[key] && item[key].length > 0) {
            result = result.concat(flattenFilter(item[key], key, item.breadcrumb))
        }
    })
    return result
}

export const flatttenMenusBreadcrumb = flattenFilter(filterMenus, 'children', [])
