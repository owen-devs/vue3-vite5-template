export class TrafficLight {
    lights: any[]
    currentIndex: number
    time: number
    constructor(lights: any[]) {
        this.lights = lights
        this.currentIndex = 0
        this.time = Date.now()
    }
    update() {
        while (1) {
            if (this.disTime() <= this.currentLight.lasts) {
                break
            }
            this.time += this.currentLight.lasts
            this.currentIndex = (this.currentIndex + 1) % this.lights.length
        }
    }
    get currentLight() {
        return this.lights[this.currentIndex]
    }
    disTime() {
        return Date.now() - this.time
    }
    getCurrentLight() {
        this.update()
        return {
            color: this.currentLight.color,
            remain: this.currentLight.lasts - this.disTime()
        }
    }
}
