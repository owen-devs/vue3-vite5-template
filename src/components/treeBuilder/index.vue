<template>
    <div>
        <el-dialog
            title="分类树管理"
            width="600px"
            top="5vh"
            v-model="showEdit"
            @closed="$emit('closed')"
            @close="showEdit = false"
        >
            <template #default>
                <div class="flex flex-col">
                    <div class="pb-0.6em flex items-start">
                        <i
                            class="block w-20px h-20px lh-20px mr-5px i-mdi-alert-circle-outline c-base"
                        ></i>
                        <div class="lh-20px text-14px c-base">说明</div>
                    </div>
                    <div class="flex-1 flex flex-col">
                        <div class="text-right">
                            <el-button type="primary" class="w-80px !h-32px" @click="addParent">
                                <i class="i-mdi-plus"></i>
                                <span>父级</span>
                            </el-button>
                        </div>
                        <el-scroller height="100%" class="flex-1">
                            <div
                                v-for="item in tagList"
                                :key="item.id"
                                class="b-b b-b-dashed b-b-bg pt-1em pb-6px"
                            >
                                <div class="flex items-center pb-10px">
                                    <i class="i-mdi-progress-pencil w-20px c-base mr-5px"></i>
                                    <el-tag
                                        type="info"
                                        :key="item.id"
                                        v-if="!item.showParentInput"
                                        :ref="getParentTagRef(item)"
                                        :closable="!item.deleteParenting"
                                        :disable-transitions="false"
                                        @close="deleteParent(item)"
                                        @click="parentTagclick(item)"
                                    >
                                        <span class="text-16px">{{ item.label }}</span>
                                    </el-tag>
                                    <el-input
                                        v-else
                                        :disabled="saveParenting"
                                        :ref="getParentInputRef(item)"
                                        v-model.trim="item.parentInputValue"
                                        size="small"
                                        class="w-98px !h-30px"
                                        :style="{ width: item.offsetWidth + 'px' }"
                                        @keyup.enter="parentInputConfirm(item)"
                                        @blur="parentInputConfirm(item)"
                                        placeholder=""
                                    ></el-input>
                                </div>
                                <div class="flex flex-start flex-wrap pl-25px">
                                    <div
                                        v-for="child in item.children"
                                        :key="child.id"
                                        class="!mr-10px !mb-10px"
                                    >
                                        <el-tag
                                            v-if="!child.showChildInput"
                                            :ref="getChildTagRef(child)"
                                            :closable="!child.deleteChilding"
                                            :disable-transitions="false"
                                            @close="deleteChild(child, item)"
                                            @click="childTagClick(child, item)"
                                        >
                                            {{ child.label }}
                                        </el-tag>
                                        <el-input
                                            v-else
                                            :disabled="saveChilding"
                                            :ref="getChildInputRef(child)"
                                            v-model.trim="child.childInputValue"
                                            size="small"
                                            class="w-90px !h-30px"
                                            :style="{ width: child.offsetwidth + 'px' }"
                                            @keyup.enter="childInputConfirm(item, child)"
                                            @blur="childInputConfirm(item, child)"
                                        ></el-input>
                                    </div>
                                    <e1-input
                                        v-if="item.showChildInput"
                                        :disabled="saveChilding"
                                        :ref="getChildInputRef(item)"
                                        v-model.trim="item.childInputValue"
                                        size="small"
                                        class="!w-90px !h-30px !mr-10px !mb-10px"
                                        @keyup.enter="childInputConfirm(item)"
                                        @blur="childInputConfirm(item)"
                                    ></e1-input>
                                    <el-button
                                        v-else
                                        class="w-90px !h-30px !mr-10px !mb-1bpx"
                                        size="small"
                                        type="info"
                                        @click="addChild(item)"
                                        plain
                                    >
                                        <i class="i-mdi-plus" />
                                        小类
                                    </el-button>
                                </div>
                            </div>
                        </el-scroller>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="dialog-footer">
                    <el-button size="small" @click="cancel">取 消</el-button>
                    <el-button
                        size="small"
                        type="primary"
                        @click="handleOk"
                        :loading="confirmLoading"
                    >
                        确 定
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <Confirm
            v-if="showConfirmDelete"
            title="确认删除分类？"
            confirm-btn-text="删除"
            @confirm="deleteDomain()"
            @closed="showConfirmDelete = false"
        />
    </div>
</template>
<script lang="ts" setup>
import { saveTree, deleteTree } from '@/api/treeManage'
import { deepClone } from '@/utils'

const props = defineProps({
    treeData: {
        type: Array<any>,
        default: () => []
    }
})

const emits = defineEmits(['closed'])

const tagList = ref<any[]>(deepClone(props.treeData) || [])

const getParentTagRef = (item: Record<string, any>) => {
    return (el: any) => {
        item.parentTagRef = el
        nextTick(() => {
            if (el?.$el?.offsetWidth) {
                item.offsetWidth = el.$el.offsetWidth
            }
        })
    }
}

const getParentInputRef = (item: Record<string, any>) => {
    return (el: any) => {
        item.parentInputRef = el
    }
}

const getChildInputRef = (child: Record<string, any>) => {
    return (el: any) => {
        child.childInputRef = el
    }
}

const getChildTagRef = (child: Record<string, any>) => {
    return (el: any) => {
        child.childTagRef = el
        nextTick(() => {
            if (el?.$el?.offsetWidth) {
                child.offsetwidth = el.$el.offsetWidth
            }
        })
    }
}

const showEdit = ref<boolean>(false)

const addParent = () => {
    tagList.value.push({
        name: '',
        label: '',
        children: [],
        showParentInput: false
    })
    nextTick(() => {
        tagList.value[tagList.value.length - 1]?.parentInputRef?.focus()
    })
}

const parentTagclick = (item: Record<string, any>) => {
    if (saveParenting.value) {
        return
    }
    item.parentInputValue = item.label
    item.showParentInput = true
    nextTick(() => {
        item.parentInputRef?.focus()
    })
}

const saveParenting = ref<boolean>(false)
const parentInputConfirm = (item: Record<string, any>) => {
    if (saveParenting.value) {
        return
    }
    if (item.parentInputValue && item.parentInputValue != item.name) {
        saveParenting.value = true
        saveTree({ parentId: null, id: item.id, name: item.parentInputValue })
            .then((res: Record<string, any>) => {
                if (item.id) {
                    const currentParent = tagList.value.find(
                        (f: Record<string, any>) => f.id === item.id
                    )
                    currentParent.name = res?.name
                    currentParent.label = res?.name
                } else {
                    const lastItem = tagList.value[tagList.value.length - 1]
                    lastItem.id = res?.id
                    lastItem.name = res?.name
                    lastItem.label = res?.name
                }
                item.parentInputValue = ''
                item.showParentInput = false
                saveParenting.value = false
            })
            .catch(() => {
                saveParenting.value = false
            })
    } else {
        if (item.id) {
            item.parentInputValue = item.name
            item.showParentInput = false
        } else {
            tagList.value.splice(tagList.value.length - 1, 1)
        }
    }
}

const showConfirmDelete = ref<boolean>(false)

const currentChild = ref<Record<string, any>>({})
const currentParent = ref<Record<string, any>>({})
const currentType = ref<string>('')

const deleteParent = (item: Record<string, any>) => {
    currentChild.value = {}
    currentParent.value = item
    currentType.value = 'parent'
    showConfirmDelete.value = true
}

const deleteChild = (child: Record<string, any>, parent: Record<string, any>) => {
    currentChild.value = child
    currentParent.value = parent
    currentType.value = 'child'
    showConfirmDelete.value = true
}

const deleteDomain = () => {
    switch (currentType.value) {
        case 'parent':
            currentParent.value.deleteParenting = true
            deleteTree({ id: currentParent.value.id })
                .then((res) => {
                    const index = tagList.value.findIndex(
                        (f: Record<string, any>) => f.id === currentParent.value.id
                    )
                    if (index !== -1) {
                        tagList.value.splice(index, 1)
                    }
                    currentParent.value.deleteParenting = false
                })
                .catch((err) => {
                    currentParent.value.deleteParenting = false
                })
            break
        case 'child':
            currentChild.value.deleteChilding = true
            deleteTree({ id: currentChild.value.id })
                .then((res) => {
                    const index = currentParent.value.children.findIndex(
                        (f: Record<string, any>) => f.id === currentChild.value.id
                    )
                    if (index !== -1) {
                        currentParent.value.children.splice(index, 1)
                    }

                    currentChild.value.deleteChilding = false
                })
                .catch((err) => {
                    currentChild.value.deleteChilding = false
                })
            break
    }
}

const saveChilding = ref<boolean>(false)
const childInputConfirm = (parent: Record<string, any>, child: Record<string, any> = {}) => {
    if (saveChilding.value) {
        return
    }
    if (parent.childInputValue || (child.childInputValue && child.childInputValue != child.name)) {
        saveChilding.value = true

        saveTree({
            parentId: parent.id,
            id: child.id,
            name: parent.childInputValue || child.childInputValue
        })
            .then((res: Record<string, any>) => {
                if (child.id) {
                    const parentTemp = tagList.value.find((f) => f.id === child.id)
                    const currentEditChild = parentTemp.children.find((f) => f.id === child.id)
                    currentEditChild.name = child.childInputValue
                    currentEditChild.label = child.childInputValue
                    child.childInputValue = ''
                    child.showChildInput = false
                } else {
                    const current = tagList.value.find((f) => f.id === parent.id)
                    if (current && !current.children) {
                        current.children = []
                    }
                    current.children.push({
                        id: res?.id,
                        parentId: res?.parentId,
                        name: res?.name,
                        label: res?.name
                    })
                    parent.childInputValue = ''
                    parent.showChildInput = false
                }
                saveChilding.value = false
            })
            .catch(() => {
                saveChilding.value = false
            })
    } else {
        if (child.id) {
            child.childInputValue = child.name
            child.showChildInput = false
        } else {
            parent.childInputValue = ''
            parent.showChildInput = false
        }
    }
}

const addChild = (item: Record<string, any>) => {
    item.showChildInput = true
    nextTick(() => {
        item?.childInputRef?.focus()
    })
}

const childTagClick = (child: Record<string, any>, parent: Record<string, any>) => {
    if (saveChilding.value) {
        return
    }
    child.showChildInput = true
    child.childInputValue = child.label
    nextTick(() => {
        child?.childInputRef?.focus()
    })
}
</script>
<style lang="scss" scoped></style>
