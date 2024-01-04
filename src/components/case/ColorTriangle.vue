<template>
    <div class="color-triangle">
        <canvas id="canvas"></canvas>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

interface Options {
    initColor: string,
    vertexs: number[][]
}

const defaultOptions = {
    initColor: '#ffffff',
    vertexs: [[100, 0], [0, 200], [200, 200]],
}
let w = 0, h = 0;
let ctx: CanvasRenderingContext2D;
let triangle: Triangle;

class Triangle {
    hasError = false;
    errorMsg = '';
    initColor = '';
    rgbColor = [];
    rVertex = [];
    gVertex = [];
    bVertex = [];

    constructor(options: Options = defaultOptions) {
        this.initColor = options.initColor
        this.rgbColor = this.getColor(options.initColor)
        if (!options.vertexs.length || options.vertexs.length > 3) {
            this.catchError('confirm vertexs length!!!')
        } else {
            this.rVertex = options.vertexs[0]
            this.gVertex = options.vertexs[1]
            this.bVertex = options.vertexs[2]
        }
    }

    draw() {
        if (this.hasError) {
            console.error(this.errorMsg)
            return
        }
        ctx.fillStyle = this.initColor
        ctx.beginPath()
        ctx.moveTo(this.rVertex[0], this.rVertex[1])
        ctx.lineTo(this.gVertex[0], this.gVertex[1])
        ctx.lineTo(this.bVertex[0], this.bVertex[1])
        ctx.closePath()
        ctx.fill()
        return this
    }

    putColor() {
        const r = this.rVertex, g = this.gVertex, b = this.bVertex
        const xMin = Math.min(r[0], g[0], b[0]), xMax = Math.max(r[0], g[0], b[0])
        const yMin = Math.min(r[1], g[1], b[1]), yMax = Math.max(r[1], g[1], b[1])
        const frame = ctx.getImageData(xMin, yMin, xMax - xMin, yMax - yMin)
        const l = frame.data.length / 4
        const [ir, ig, ib] = this.rgbColor
        const rt = Math.min(this.calcDistance(this.rVertex, this.gVertex), this.calcDistance(this.rVertex, this.bVertex))
        const gt = Math.min(this.calcDistance(this.rVertex, this.gVertex), this.calcDistance(this.gVertex, this.bVertex))
        const bt = Math.min(this.calcDistance(this.bVertex, this.gVertex), this.calcDistance(this.rVertex, this.bVertex))
        for (let i = 0; i < l; i++) {
            const x = i % (xMax - xMin)
            const y = Math.floor(i / (xMax - xMin))
            let r = frame.data[i * 4 + 0];
            let g = frame.data[i * 4 + 1];
            let b = frame.data[i * 4 + 2];
            if (r === ir && g === ig && b === ib) {
                frame.data[i * 4 + 0] = this.calcColor([x, y], this.rVertex, rt)
                frame.data[i * 4 + 1] = this.calcColor([x, y], this.gVertex, gt)
                frame.data[i * 4 + 2] = this.calcColor([x, y], this.bVertex, bt)
            }
        }
        ctx.putImageData(frame, xMin, yMin)
    }

    getColor(color: string) {
        const r = parseInt('0x' + color.slice(1, 3))
        const g = parseInt('0x' + color.slice(3, 5))
        const b = parseInt('0x' + color.slice(5, 7))
        return [r, g, b]
    }

    calcColor([x1, y1]: number[], [x2, y2]: number[], total: number) {
        const d = this.calcDistance([x1, y1], [x2, y2])
        if (d > total) {
            return 0
        }
        return 255 - Math.floor(d / total * 255)
    }

    // 计算两点间距
    calcDistance([x1, y1]: number[], [x2, y2]: number[]) {
        const xDistance = Math.abs(x1 - x2);
        const yDistance = Math.abs(y1 - y2);
        return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    }

    catchError(msg: string) {
        this.hasError = true
        this.errorMsg = msg
    }
}

const init = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    ctx = canvas.getContext('2d')
    w = canvas.parentElement.offsetWidth
    h = canvas.parentElement.offsetHeight
    canvas.width = w
    canvas.height = h
    defaultOptions.vertexs = [[w / 2, 100], [50, h - 400], [w - 50, h - 400]]
    triangle = new Triangle()
    triangle.draw().putColor()
}

onMounted(() => {
    init()
})

</script>

<style lang="scss">
.color-triangle {
    height: 100%;
}
</style>
