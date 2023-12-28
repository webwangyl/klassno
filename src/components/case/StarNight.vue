<template>
    <div class="star-night">
        <div class="star-source" v-for="item in layerList" :style="item"></div>
    </div>
</template>

<script lang="ts" setup>
const layerList = [
    { animationDelay: '0', animationDuration: '5.7s', opacity: 1, left: 0, '--s': '15px' },
    { animationDelay: '1.7s', animationDuration: '6.2s', opacity: 0.9, left: '17px', '--s': '14px' },
    { animationDelay: '2.1s', animationDuration: '6.9s', opacity: 0.7, left: '36px', '--s': '12px' },
    { animationDelay: '2.9s', animationDuration: '8.3s', opacity: 0.5, left: '61px', '--s': '10px' },
    { animationDelay: '3.7s', animationDuration: '8.9s', opacity: 0.3, left: '73px', '--s': '7.5px' },
    { animationDelay: '4.9s', animationDuration: '9.6s', opacity: 0.2, left: '89px', '--s': '6px' },
]
</script>

<style lang="scss">
.star-night {
    height: 100%;
    position: relative;
    overflow: hidden;
    @function shadow-start($start: 100, $gutter: 100, $end: 2001) {
        $i: $start;
        $val: 0 0 0 0 var(--color-inside);
        @while($i < $end) {
            $val: #{$i}px 0 0 1px var(--color-inside), $val;
            $i: $i + $gutter;
        }
        @return $val
    };
    @function shadow-end($start: 100, $gutter: 100, $end: 2001, $height: 1000) {
        $i: $start;
        $val: 0 0 0 0 var(--color-inside);
        @while($i < $end) {
            $val: #{$i}px #{(random() + 1) * $height * 0.6}px 0 1px var(--color-inside), $val;
            $i: $i + $gutter;
        }
        @return $val
    };
    @keyframes star_run {
        0% {
            box-shadow: shadow-start();
        }
        100% {
            box-shadow: shadow-end();
        }
    }
    .star-source {
        position: absolute;
        width: var(--s);
        height: var(--s);
        border-radius: 50%;
        filter: blur(2px);
        background-color: var(--color-inside);
        animation: star_run infinite linear reverse;
        top: -16px;
    }
}
</style>
