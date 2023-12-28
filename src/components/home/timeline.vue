<template>
    <div class="timeline">
        <div class="timeline-container">
            <div v-for="(item, index) in timelineList" :key="index" class="timeline-container">
                <div class="timeline-line"></div>
                <div class="timeline-dot" :class="{ 'is-last': index === timelineList.length - 1 }">
                    <div class="content-box">
                        <MagicCard>
                            <template v-slot:hover>
                                <p class="timeline-info col-text">{{ item.info }}</p>
                                <p class="timeline-time col-text">{{ item.time }}</p>
                            </template>
                            <div class="circle-img"></div>
                        </MagicCard>
                    </div>
                </div>
            </div>
            <div class="timeline-container">
                <div class="timeline-line noice-bg"></div>
                <span class="noice-text timeline-tip">Travel Continue ...</span>
            </div>
        </div>
        <div class="mask"></div>
    </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap';
import { onMounted } from 'vue';
import MagicCard from '../case/MagicCard.vue';

interface ITimelineItem {
    time: string,
    info: string,
}

const scrollTrigger = {
    trigger: '.mask',
    scroller: '.main',
    start: 'top 50%',
    end: 'bottom 60%',
    toggleActions: 'restart pause resume reverse',
}

const timelineList: ITimelineItem[] = [
    { time: '19980529', info: '出生' },
    { time: '20190715', info: '亚信实习' },
    { time: '20200630', info: '大学毕业' },
    { time: '20200715', info: '科蓝' },
    { time: '20210510', info: '华云安' },
    { time: '20230417', info: '海纳AI' }
]

const init = () => {
    gsap.to('.mask', {
        scrollTrigger,
        x: 150 * (timelineList.length + 1) + 240 + 'px',
        duration: timelineList.length * 2,
    })
    gsap.from('.content-box', {
        scrollTrigger,
        ease: 'elastic.out(1, 0.3)',
        stagger: 1,
        height: 0,
        padding: 0,
        duration: .5,
        delay: .4,
    })
    gsap.from('.timeline-info', {
        scrollTrigger,
        stagger: 1,
        opacity: 0,
        duration: .1,
        delay: .6,
    })
    gsap.from('.timeline-time', {
        scrollTrigger,
        stagger: 1,
        opacity: 0,
        duration: .1,
        delay: .6,
    })
}

onMounted(init)
</script>

<style lang="scss">
div.timeline {
    display: flex;
    align-items: center;
    position: relative;
    .timeline-container {
        display: flex;
        align-items: center;
        transform: translateY(-50px);
        height: 12px;
        margin-bottom: 40px;
        .timeline-line {
            height: 1px;
            width: 120px;
            background-color: var(--placeholder-color);
        }
        .noice-bg {
            background-color: var(--noice-text);
        }
        .timeline-tip {
            margin-left: 20px;
        }
        .timeline-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid var(--placeholder-color);
            margin: 0 8px;
            position: relative;
            &.is-last {
                border-color: var(--noice-text);
            }
            .content-box {
                position: absolute;
                top: 40px;
                left: -36px;
                width: 80px;
                min-height: 300px;
                .card {
                    display: flex;
                    justify-content: space-between;
                    word-break: break-all;
                }
                .circle-img {
                    @include circle-image;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 20px;
                    left: 0;
                    top: 0;
                }
                .col-text {
                    width: 1px;
                    word-break: break-all;
                    white-space: pre-wrap;
                }
                .timeline-time {
                    font-size: 14px;
                    margin-right: 10px;
                    font-weight: 200;
                }
            }
        }
    }
    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 99;
        background-color: var(--color-theme);
    }
}
</style>
