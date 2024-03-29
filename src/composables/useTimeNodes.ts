//获取一天里的特定时间节点
export function useTimeNodes(
    start: string = '08:00',
    end: string = '24:00',
    step: string = '02:00',
    fmt: string = 'HH:mm'
) {
    const getHourMinuteSeconds = (time: string): number[] => {
        const [hour, minute, second] = time.split(':').map(Number)
        return [hour || 0, minute || 0, second || 0]
    }

    const parseTime = (time: string): Date => {
        const [hour, minute, second] = getHourMinuteSeconds(time)
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate(), hour, minute, second)
    }

    const getNodeTimes = (date: Date): string => {
        return useFormatDateTime(date, fmt)
    }

    const addTimes = (date: Date): Date => {
        const [hour, minute, second] = getHourMinuteSeconds(step)
        return new Date(date.getTime() + hour * 3600000 + minute * 60000 + second * 1000)
    }

    const timeNodes: string[] = []

    const [hour, minute, second] = getHourMinuteSeconds(step)
    if (hour === 0 && minute === 0 && second === 0) {
        throw new Error('时间步长不能为0')
    }

    let currentTime = parseTime(start)
    const endTime = parseTime(end)

    while (currentTime <= endTime) {
        timeNodes.push(getNodeTimes(currentTime))
        currentTime = addTimes(currentTime)
    }

    //处理24:00
    if (
        timeNodes.length > 1 &&
        String(getHourMinuteSeconds(timeNodes[timeNodes.length - 1])[0]).padStart(2, '0') === '00'
    ) {
        timeNodes[timeNodes.length - 1] = '24:00'
    }
    return { timeNodes }
}
