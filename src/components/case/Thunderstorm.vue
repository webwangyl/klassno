<template>
	<div class="thunderstorm">
		<canvas id="thunderstorm-canvas" @mouseenter="stop" @mouseleave="going"></canvas>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let w: number;
let h: number;
const m = Math;
const pi = m.PI;
const v = m.cos;
let isStop = ref<boolean>(false)
const arr = [];

class Rain {
    x = 0
    y = 0
    grd = null
    radiusX = 6
    radiusY = 10
    dy = 1
    ay = 0.3
    raw = {
        radiusX: 6,
        radiusY: 10,
        dy: 1,
    }
    constructor() {
        this.x = Math.random() * w
        this.y = -10
        this.grd = ctx.createLinearGradient(this.x, this.y, this.x + this.radiusX, this.y + this.radiusY)
        this.grd.addColorStop(0, '#d3e6ed')
        this.grd.addColorStop(1, '#a4dcf3')
        this.draw()
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.grd
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, pi * 2)
        ctx.fill()
        ctx.closePath()
    }
    run() {
        this.radiusX = Math.max(0.5, this.radiusX - 2)
        this.radiusY = Math.max(15, this.radiusY + 2)
        this.dy = Math.max(this.ay + this.dy, 6)
        this.y += this.dy
    }
    stop() {
        this.radiusX = this.raw.radiusX
        this.radiusY = this.raw.radiusY
        this.dy = this.raw.dy
    }
}

const going = () => {
    isStop.value = false
    refresh()
}

const stop = () => {
    isStop.value = true
    arr.forEach(el => {
        el.stop()
    })
    ctx.clearRect(0, 0, w, h)
    arr.forEach(el => {
        el.draw()
    })
}

const refresh = () => {
    arr.forEach((el, index) => {
        if (el.y > h + 10) {
            arr.splice(index, 1)
        } else {
            el.run()
        }
    })
    ctx.clearRect(0, 0, w, h)
    arr.forEach(el => {
        el.draw()
    })
    if (!isStop.value) {
        requestAnimationFrame(refresh);
    }
}

const add = () => {
    const rain = new Rain()
    arr.push(rain)
    setTimeout(add, 40)
}

const rainning = () => {
    add()
    refresh()
}

const init = () => {
    setTimeout(() => {
        canvas = document.getElementById("thunderstorm-canvas") as HTMLCanvasElement;
        w = canvas.parentElement.offsetWidth;
        h = canvas.parentElement.offsetHeight;
        canvas.width = w;
        canvas.height = h;
        ctx = canvas.getContext("2d");
        rainning()
    }, 500)
};

onMounted(init);
</script>

<style lang="scss">
.thunderstorm {
	width: 100%;
	height: 100%;
    background-color: rgb(32, 97, 123);
}
</style>
