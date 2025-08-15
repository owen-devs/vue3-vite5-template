<template>
    <el-scrollbar class="main-scroll-bar animate__animated animate__slideInUp" height="100%">
        <router-view v-slot="{ Component, route }">
            <transition>
                <keep-alive>
                    <component :key="route.fullPath" :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
    </el-scrollbar>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
