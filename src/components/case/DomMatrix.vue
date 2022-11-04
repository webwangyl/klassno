<template>
	<svg class="dom-matrix" @click="render">
		<text v-if="isTip" :x="50" :y="50" :font-size="18" fill="#131517">Crazy Click!</text>
	</svg>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import gsap from "gsap";

interface IAttr {
	points: number;
	classname: string;
	x?: number;
	y?: number;
	size?: number;
	color?: string;
}

const arr = [];
let isTip = ref<boolean>(true)

class Star {
	starPoints: DOMPoint[];
	el: SVGPathElement;
	parentEl: HTMLElement;
	deg: number;
	attr: IAttr;
	tx: number;
	ty: number;
	_node: HTMLElement[];
	constructor(attr: IAttr) {
		this.attr = attr;
		this.tx = (Math.random() - 0.5) * 50;
		this.ty = (Math.random() - 0.5) * 50;
		this.deg = 0;
		this.starPoints = this.createShape(this.attr);
		this.parentEl = document.querySelector("svg.dom-matrix");
		this.el = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"path"
		);
		this.el.classList.add(this.attr.classname);
		this.parentEl.appendChild(this.el);
		this.el.setAttribute("stroke", this.attr.color || "#000");
		this.el.setAttribute(
			"d",
			`M ${this.starPoints
				.map((point) => `${point.x} ${point.y}`)
				.join(", ")} z`
		);
		this.transformShape(this.attr);
	}
	createShape({ points = 10, x = 0, y = 0, size = 1 }) {
		return Array.from({ length: points }, (_, i) =>
			new DOMMatrix()
				.translate(x, y)
				.scale(size)
				.rotate((i / points) * this.deg)
				.translate(0, i % 2 ? -1 : -2)
				.transformPoint({ x: 0, y: 0 })
		);
	}
	transformShape({ points, x, y, size, classname }: IAttr) {
		if (this.deg < 360) {
			this.deg += 10;
			const starPoints = Array.from({ length: points }, (_, i) =>
				new DOMMatrix()
					.translate(x, y)
					.scale(size)
					.rotate((i / points) * this.deg)
					.translate(0, i % 2 ? -1 : -2)
					.transformPoint({ x: 0, y: 0 })
			);
			this.el.setAttribute(
				"d",
				`M ${starPoints
					.map((point) => `${point.x} ${point.y}`)
					.join(", ")} z`
			);
			requestAnimationFrame(() => this.transformShape(this.attr));
		} else {
			this._node = [];
			for (let i = 0; i < 5; i++) {
				const _star = this.el.cloneNode() as HTMLElement;
				_star.setAttribute("opacity", (5 - i) / 10 + "");
				this.parentEl.appendChild(_star);
				this._node.push(_star);
			}
			let tl = gsap.timeline();
			let _this = this;
			tl.to("." + classname, {
				x: this.tx,
				y: this.ty,
				ease: "elastic.out(1, 0.3)",
				duration: 2,
				stagger: 0.2,
				onComplete: () => {
					this._node.forEach((_) => _this.parentEl.removeChild(_));
				},
			}).to("." + classname, {
				opacity: 0,
				duration: 1,
				onComplete: () => {
					this.parentEl.removeChild(this.el);
					this.el = null;
				},
			});
		}
	}
}

const render = (e: MouseEvent) => {
    isTip.value = false
	const { offsetX, offsetY } = e;
	const size = Math.random() * 15 + 7;
	const star = new Star({
		classname: "star" + arr.length,
		points: 10,
		x: offsetX,
		y: offsetY,
		size,
	});
	arr.push(star);
};
</script>

<style lang="scss">
.dom-matrix {
	width: 100%;
	height: 100%;
}
</style>
