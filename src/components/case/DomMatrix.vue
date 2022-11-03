<template>
    <svg class="dom-matrix">
        <path class="star" stroke="#000"></path>
    </svg>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import gsap from 'gsap'

let star
let deg = 0
const attr = { points: 10, x: 50, y: 50, size: 23 }

const createShape = ({ points = 10, x = 0, y = 0, size = 1 }) => {
	return Array.from({ length: points }, (_, i) =>
		new DOMMatrix()
			.translate(x, y)
			.scale(size)
            .rotate((i / points) * 0)
            .translate(0, i% 2 ? -1 : -2)
			.transformPoint({ x: 0, y: 0 })
	);
}

const transformShape = ({ points = 10, x = 0, y = 0, size = 1 }, { tx = 100, ty = 33 }) => {
    if (deg < 360) {
        deg++
        const starPoints = Array.from({ length: points }, (_, i) =>
            new DOMMatrix()
                .translate(x, y)
                .scale(size)
                .rotate((i / points) * deg)
                .translate(0, i% 2 ? -1 : -2)
                .transformPoint({ x: 0, y: 0 })
        );
        star.setAttribute('d', `M ${starPoints.map((point) => `${point.x} ${point.y}`).join(', ')} z`)
        requestAnimationFrame(() => transformShape(attr, { tx, ty }))
    } else {
        let el = document.querySelector('.dom-matrix')
        for (let i = 0; i < 5; i++) {
            const _star = star.cloneNode(star)
            _star.setAttribute('opacity', (5 - i) / 10)
            el.appendChild(_star)
        }
        gsap.to('.star', {
            x: tx, y: ty, ease: 'elastic.out(1, 0.3)', duration: 2, stagger: .2
        })
    }
}

const render = () => {
    const starPoints = createShape(attr)
    star = document.querySelector('.star')
    star.setAttribute('d', `M ${starPoints.map((point) => `${point.x} ${point.y}`).join(', ')} z`)
    transformShape(attr, { tx: 100, ty: 33 })
}

onMounted(() => setTimeout(render, 0))
</script>

<style lang="scss">
.dom-matrix {
    width: 100%;
    height: 100%;
}
</style>
