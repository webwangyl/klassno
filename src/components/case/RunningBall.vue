<template>
	<div class="running-ball">
		<canvas id="runningball"></canvas>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { throttle } from '../../utils'

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let w: number;
let h: number;
const m = Math;
const pi = m.PI;
const v = m.cos;
let ofx = -1000;
let ofy = -1000;
let num = 0;
const arr = [];

class Ball {
	x = 0;
	y = 0;
	vx = 3;
	vy = 2;
	raw = m.random() * 10 + 10;
	hor = true;
	radius = 0;
	color = "#fff";
	constructor() {
		this.x = 0;
		this.y = m.random() * 20;
		this.vx = m.random() * 3 + 0.4;
		this.vy = m.random() * 2 + 0.4;
		this.radius = this.raw;
		num -= pi / -20;
		const rgb = (
			((v(num) * 127 + 128) << 16) |
			((v(num + pi / 3) * 127 + 128) << 8) |
			(v(num + (pi / 3) * 2) * 127 + 128)
		).toString(16);
		this.color = "#" + rgb;
		this.d(this.x, this.y, this.radius, this.color);
	}
	d(x = this.x, y = this.y, radius = this.radius, color = this.color) {
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(x, y, radius, 0, pi * 2);
		ctx.fill();
		ctx.closePath();
	}
	m() {
		if (this.x - this.radius < w) {
			this.x += this.vx;
			if (this.hor) {
				this.y += this.vy;
				if (this.y - this.radius > h + 3 * this.vy) {
					this.hor = false;
				}
			} else {
				this.y -= this.vy;
				if (this.y + this.radius < 0 - 3 * this.vy) {
					this.hor = true;
				}
			}
			if (
				ofx < this.x + 50 &&
				ofx > this.x - 50 &&
				ofy < this.y + 50 &&
				ofy > this.y - 50
			) {
				this.radius = m.min(this.raw + 20, this.radius + 1);
			} else if (this.raw != this.radius) {
				this.radius = m.max(this.raw, this.radius - 1);
			}
		}
	}
}

const i = (flag?: boolean) => {
	const ball = new Ball();
	arr.push(ball);
	if (!flag) r();
	setTimeout(() => i(true), m.random() * 1000);
};
const r = () => {
	for (let i = 0; i < arr.length; i++) {
		const el = arr[i];
		if (el.x - el.radius > w) {
			arr.splice(i, 1);
		} else {
			el.m();
		}
	}
	ctx.clearRect(0, 0, w, h);
	arr.forEach((el) => {
		el.d();
	});
	requestAnimationFrame(r);
};

const init = () => {
    setTimeout(() => {
        canvas = document.getElementById("runningball") as HTMLCanvasElement;
        w = canvas.parentElement.offsetWidth;
        h = canvas.parentElement.offsetHeight;
        canvas.width = w;
        canvas.height = h;
        ctx = canvas.getContext("2d");
        window.addEventListener("mousemove", throttle((e) => {
            ofx = e.offsetX;
            ofy = e.offsetY;
        }));
        i();
    }, 500)
};

onMounted(init);
</script>

<style lang="scss">
.running-ball {
	width: 100%;
	height: 100%;
    background-color: #ffe660;
}
</style>
