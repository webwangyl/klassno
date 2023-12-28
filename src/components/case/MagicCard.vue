<template>
    <div class="lower-card">
        <div class="outer" @mousemove="transferCard" @mouseleave="leaveCard">
            <div ref="card" class="card" :class="{ 'light': isHover }" :style="computedStyle">
                <template v-if="isHover">
                    <slot name="hover">
                        <p>Congratulations</p>
                        This is an ancient secret book with magical powers. What are its abilities? <br/>
                        <ol>
                            <li>Ephemeral.</li>
                            <li>Nefelibata.</li>
                            <li>Phosphene.</li>
                        </ol>
                        If you don't know these words, you can try copying and translating them, and then you will find that it successfully wasted your precious 1 minute. Thank you!
                    </slot>
                </template>
                <div class="default-inner" v-else>
                    <slot>Hover Me !!!</slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

let x: number, y: number;
const card = ref(null)
let rotateX = ref(0), rotateY = ref(0), translateX = ref(0), translateY = ref(0), isHover = ref(false);
const funcCurve = (x: number) => {
    return 1 - Math.sin(x)
}

const computedStyle = computed(() => ({
    '--rotateX': rotateX.value,
    '--rotateY': rotateY.value,
    '--translateX': translateX.value + 'px',
    '--translateY': translateY.value + 'px'
}))

const transferCard = (e: MouseEvent) => {
    const { offsetX, offsetY } = e
    translateX.value = offsetX
    translateY.value = offsetY
    const xline = offsetX / x * Math.PI // 0 - pi
    const yline = offsetY / y * Math.PI
    rotateX.value = funcCurve(xline)
    rotateY.value = funcCurve(yline)
    isHover.value = true
}

const leaveCard = () => {
    rotateX.value = 0
    rotateY.value = 0
    translateX.value = 0
    translateY.value = 0
    isHover.value = false
}

onMounted(() => {
    const rect = card.value.getBoundingClientRect()
    x = rect.width
    y = rect.height
})
</script>

<style lang="scss">
.lower-card {
    height: 100%;
    .outer {
        height: 100%;
    }
    .outer:hover .card {
        zoom: 1.1;
    }
    .card {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        background-color: var(--color-theme);
        box-shadow: 5px 5px 10px 0 var(--color-inside);
        transform: rotate3d(var(--rotateX), var(--rotateY), 0, 20deg);
        color: var(--color-theme);
        padding: 20px;
        line-height: 1.8em;
        text-align: left;
        position: relative;
        .default-inner {
            color: var(--color-inside);
            flex: 1;
        }
        * {
            pointer-events: none
        }
        p {
            text-align: center;
            font-weight: 600;
        }
    }
    .light {
        background-image: radial-gradient( 
        farthest-corner circle at var(--translateX) var(--translateY), 
        hsl(0, 17%, 91%) 10%, 
        hsla(0, 0%, 100%, 0.2) 20%, 
        hsla(0, 0%, 0%, 0.1) 100% 
        );
    }
}
</style>
