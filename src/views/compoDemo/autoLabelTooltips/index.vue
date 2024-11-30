<template>
    <div class="w-461px">
        <AutoLabelTooltips :tags="tags" class="mb-20px" :rows="3" />
        <AutoLabelTooltips :tags="tagss" class="mb-20px" />
        <AutoLabelTooltips :tags="tagsss" class="mb-20px" :rows="2" />
        <AutoLabelTooltips :tags="tagssss" />
    </div>
</template>
<script lang="ts" setup>
const tags = ref<string[]>([])
const tagss = ref<string[]>([])
const tagsss = ref<string[]>([])
const tagssss = ref<string[]>([])

onMounted(() => {
    // setTimeout(() => {
    tags.value = [
        '标签发8989生的发生的发',
        '标签打89发打发地方辅导辅导发的',
        '比我77爱你',
        'd8989d',
        '地对77898地导弹',
        'dfdfdf8d辅导辅导发',
        '但333898933',
        '地对地8989导弹广告',
        '地对668989地导弹',
        '哇哇8889989哇',
        '反反复复发',
        '标签发生2的发生的发',
        '标签打发打2发地方辅导辅导发的',
        '比我2爱你',
        'd2d',
        '地对地2导弹',
        'dfdfdfd2辅导辅导发',
        '但332333',
        '地对地导2弹广告',
        '地对地2导弹',
        '哇哇98989哇2',
        '反反复复2发'
    ]
    tagss.value = ['标签发8989生的发生的发', '标签打89发打发地方辅导辅导发的', '比我77爱你']

    tagsss.value = [
        '标签发8989生的发生的发',
        '标签打89发打发地方辅导辅导发的',
        '比我77爱你',
        'd8989d',
        '地对77898地导弹',
        'dfdfdf8d辅导辅导发',
        '但333898933',
        '地对地8989导弹广告',
        '地对668989地导弹'
    ]
    tagssss.value = [
        '标签发8989生的发生的发',
        '标签打89发打发地方辅导辅导发的',
        '比我77爱你',
        'd8989d',
        '地对77898地导弹',
        'dfdfdf8d辅导辅导发',
        '但333898933'
    ]
    // }, 1000)
})
</script>
<style lang="scss" scoped></style>
