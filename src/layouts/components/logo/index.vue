<template>
    <div class="flex items-center !py-0.5em !px-20px h-60px">
        <div class="flex pr-10px">
            <i class="flex-inline w-1.4em h-1.4em c-base">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path
                        fill="currentColor"
                        d="M448 68.48v64.832A384.128 384.128 0 0 0 512 896a384.128 384.128 0 0 0 378.688-320h64.768A448.128 448.128 0 0 1 64 512 448.128 448.128 0 0 1 448 68.48z"
                    ></path>
                    <path
                        fill="currentColor"
                        d="M576 97.28V448h350.72A384.064 384.064 0 0 0 576 97.28zM512 64V33.152A448 448 0 0 1 990.848 512H512z"
                    ></path>
                </svg>
            </i>
        </div>
        <div
            :style="{ opacity: collapseStore.isCollapse ? 0 : 1 }"
            class="flex-1 text-16px c-bg2 font-bold transition-opacity-300 keep-all"
        >
            {{ appTitle }}
        </div>
    </div>
</template>
<script lang="ts" setup>
const collapseStore = useCollapseStore()
const { VITE_APP_TITLE } = useEnvs()
const appTitle = computed(() => VITE_APP_TITLE)
</script>
<style lang="scss" scoped></style>
