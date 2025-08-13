<template>
    <div class="w-110px">
        <AutoTooltips :text="text1" class="mb-10px" />
        <AutoTooltips :text="text2" class="mb-10px" />
        <AutoTooltips :text="text3" :rows="3" class="mb-10px" />
        <AutoTooltips :text="text4" :rows="3" class="mb-10px" />
        <AutoTooltips text="" :rows="3" class="mb-10px" />
    </div>
</template>
<script lang="ts" setup>
const text1 = ref()
const text2 = ref()
const text3 = ref()
const text4 = ref()

setTimeout(() => {
    text1.value = '地方都是发收'
    text2.value = '地方都是发1-2-'
    text3.value = '地方都是发收的发生的发生的打的'
    text4.value =
        '地方都是发收的发生的发生的打发打发打发打发地方都是发收的发生的发生的打发打发打发打发水电费发生的发生的发发水电费发生的发生的发发生的发生的'
}, 10)
</script>
<style lang="scss" scoped></style>
