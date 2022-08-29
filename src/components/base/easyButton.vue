<template>
    <div class="easy-button" @mouseenter="HandleMouseEnter" @mouseleave="HandleMouseLeave" @click="HandleClick">
        <span class="icon">
            <span class="arrow" :class="'arrow-' + type">
                <span class="bar"></span>
                <span class="triangle"></span>
            </span>
            <span class="arrow hover" :class="'arrow-' + type">
                <span class="bar"></span>
                <span class="triangle"></span>
            </span>
        </span>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, defineEmits, defineProps, ref } from 'vue'
import useGridTransform, { GridTransform } from "../../hooks/useGridTransform";

let gridTransform: GridTransform;

const emit = defineEmits<{
    (event: 'touch', e: MouseEvent): void, 
}>()

const prop = defineProps<{
    type?: string,
}>()

const type = ref(prop.type || 'right')

onMounted(() => {
	gridTransform = useGridTransform();
})
const HandleMouseEnter = (e: MouseEvent) => {
    gridTransform.HandleMouseEnter(e)
}
const HandleMouseLeave = () => gridTransform.HandleMouseLeave()
const HandleClick = (e: MouseEvent) => {
    emit('touch', e)
}

</script>

<style lang="scss" setup>
.easy-button {
    width: 40px;
    height: 40px;
    border: 1px solid rgba($color-inside, .4);
    border-radius: 50%;
    cursor: pointer;
    text-align: center;
    position: relative;
    .icon {
        position: absolute;
        top: 50%;
        margin-top: -3px;
        height: 7px;
        left: 2px;
        right: 2px;
        overflow: hidden;
        transform: translateX(0);
        transition: transform .3s ease-out;
        transition-delay: .2s;
        will-change: transform;
        .arrow {
            position: absolute;
            top: calc(50% - 1px);
            left: calc(50% - 2px);
            width: 1px;
            height: 1px;
            transition: transform .5s;
            transition-timing-function: cubic-bezier(0,0,.25,1);
            transition-delay: 0;
            will-change: transform;
            .bar {
                position: absolute;
                top: 0;
                width: 15px;
                left: -6px;
                height: 1px;
                background-color: $color-inside;
            }
            .triangle {
                position: absolute;
                top: -3px;
                left: 8px;
                width: 6px;
                height: 7px;
                border-top: 3.5px solid transparent;
                border-left: 3.5px solid $color-inside;
                border-bottom: 3.5px solid transparent;
            }
        }
        .arrow-right.hover {
            transform: translateX(-30px);
            transition-delay: .1s;
        }
        .arrow-left.hover {
            transform: translateX(30px);
            transition-delay: .1s;
        }
        .arrow-right {
            .bar {
                left: -6px;
            }
            .triangle {
                left: 8px;
                border-top: 3.5px solid transparent;
                border-left: 3.5px solid $color-inside;
                border-bottom: 3.5px solid transparent;
            }
        }
        .arrow-left {
            .bar {
                left: -6px;
            }
            .triangle {
                left: -8px;
                border-top: 3.5px solid transparent;
                border-right: 3.5px solid $color-inside;
                border-left: none;
                border-bottom: 3.5px solid transparent;
            }
        }
    }
}
.easy-button:hover {
    border: 1px solid $color-inside;
    .icon .arrow-right {
        transform: translateX(30px);
    }
    .icon .arrow-left {
        transform: translateX(-30px);
    }
    .icon .arrow.hover {
        transform: translateX(0);
    }
}
</style>