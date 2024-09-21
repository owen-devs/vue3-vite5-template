<template>
    <div class="traffic-lights w-530px" :class="[currentColor]" v-auto-animate>
        <h2>交通信号灯：问询模式</h2>
        <div class="flex items-center">
            <div class="green bg-gray rd-50% w-150px h-150px mr-40px"></div>
            <div class="yellow bg-gray rd-50% w-150px h-150px mr-40px"></div>
            <div class="red bg-gray rd-50% w-150px h-150px"></div>
        </div>
        <div class="mt-20px text-48px text-center count-time">{{ countTime }}</div>
    </div>
</template>
<script lang="ts" setup>
import { TrafficLight } from './TrafficLight'
const countTime = ref<number>(0)
const currentColor = ref<string>('red')
const light = new TrafficLight([
    {
        color: 'green',
        lasts: 10000
    },
    {
        color: 'yellow',
        lasts: 3000
    },
    {
        color: 'red',
        lasts: 5000
    }
])

const update = () => {
    const current = light.getCurrentLight()
    currentColor.value = current.color
    countTime.value = Math.floor(current.remain / 1000) + 1
}

const raf = () => {
    requestAnimationFrame(() => {
        update()
        raf()
    })
}

onMounted(() => {
    raf()
})
</script>
<style lang="scss" scoped>
.green {
    .green {
        @apply bg-green c-green;
    }
    .count-time {
        @apply c-green;
    }
}
.red {
    .red {
        @apply bg-red c-red;
    }
    .count-time {
        @apply c-red;
    }
}
.yellow {
    .yellow {
        @apply bg-yellow c-yellow;
    }
    .count-time {
        @apply c-yellow;
    }
}
</style>
