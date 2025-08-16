<template>
    <el-scrollbar class="main-scroll-bar animate__animated animate__slideInUp" height="100%">
        <router-view v-slot="{ Component, route }">
            <transition>
                <div class="h-full">
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
