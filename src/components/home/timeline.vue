<template>
    <div class="timeline">
        <div class="timeline-container">
            <div v-for="(item, index) in timelineList" :key="index" class="timeline-container">
                <div class="timeline-line"></div>
                <div class="timeline-dot">
                    <div class="content-box">
                        <p class="timeline-info col-text">{{ item.info }}</p>
                        <p class="timeline-time col-text">{{ item.time }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface ITimelineItem {
    time: string,
    info: string,
}

const timelineList: ITimelineItem[] = [
    { time: '19980529', info: '出生' },
    { time: '20100630', info: '小学毕业' }
]
</script>

<style lang="scss">
div.timeline {
    .timeline-container {
        display: flex;
        align-items: center;
        height: 12px;
        margin-bottom: 40px;
        .timeline-line {
            height: 1px;
            width: 120px;
            background-color: var(--noice-text);
        }
        // var(--placeholder-color)
        .timeline-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid var(--noice-text);
            margin: 0 8px;
            position: relative;
            .content-box {
                position: absolute;
                top: 40px;
                left: -36px;
                background-color: var(--placeholder-color);
                padding: 20px;
                border-radius: 12px;
                display: flex;
                width: 80px;
                justify-content: space-between;
                .col-text {
                    width: 1px;
                    word-break: break-all;
                    white-space: pre-wrap;
                }
                .timeline-time {
                    color: var(--primary-text);
                    font-size: 14px;
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>
