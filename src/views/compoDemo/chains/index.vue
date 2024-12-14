<template>
    <div>请看控制台打印</div>
</template>
<script lang="ts" setup>
//链式调用和延迟执行
function arrange(name: string) {
    const tasks: any[] = []

    tasks.push(() => {
        console.log(name)
    })

    function wait(delay: number) {
        tasks.push(
            () =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log('等5s执行')
                        resolve('等待5s执行')
                    }, delay)
                })
        )
        return this
    }

    function waitFirst(delay: number) {
        tasks.unshift(
            () =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log('等3s执行')
                        resolve('等待3s执行')
                    }, delay)
                })
        )
        return this
    }

    function doSome() {
        tasks.push(() => {
            console.log('to do something')
        })

        return this
    }

    function execute() {
        ;(async () => {
            for (const task of tasks) {
                await task()
            }
        })()
        return this
    }

    return {
        wait,
        doSome,
        execute,
        waitFirst
    }
}

arrange('链式调用等待').waitFirst(3000).doSome().wait(5000).execute()
</script>
<style lang="scss" scoped></style>
