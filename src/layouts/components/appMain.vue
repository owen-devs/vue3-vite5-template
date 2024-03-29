<template>
    <el-scrollbar
        class="main-scroll-bar animate__animated animate__slideInUp"
        max-height="calc(100vh - 60px)"
    >
        <router-view v-slot="{ Component, route }">
            <transition>
                <div v-show="true" class="p-1em">
                    <keep-alive>
                        <component :key="route.fullPath" :is="Component" />
                    </keep-alive>
                </div>
            </transition>
        </router-view>
    </el-scrollbar>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
