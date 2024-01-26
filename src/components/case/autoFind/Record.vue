<template>
    <div class="find-record">
        <div class="record-list record-title">
            <div class="record-1">useType</div>
            <div class="record-1">useVisual</div>
            <div class="record-1">useTime</div>
            <div class="record-3">useSeed</div>
            <div class="record-1">useRoad</div>
        </div>
        <div class="record-list" v-for="record in props.list" :key="record.key">
            <div class="record-1">{{ record.type }}</div>
            <div class="record-1">{{ record.useVisual }}</div>
            <div class="record-1">{{ formatTime(record.useTime) }}</div>
            <div class="record-3">
                <span>{{ record.seed }}</span>
                <i class="knofont knocopy copy" @click="copy(record.seed)"></i>
            </div>
            <div class="record-1">
                {{ record.road }}
                <i class="knofont knodelete" @click="remove(record.key)"></i>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IRecord } from './record'

const props = defineProps<{
    list: IRecord[]
}>()

const emits = defineEmits(['remove'])

const copy = (seed: number | string) => {
    if (!document.getElementById('copyTarget')) {
        const copyTarget = document.createElement('input')
        copyTarget.setAttribute(
            'style',
            'position:fixed;top:0;left:0;opacity:0;z-index:-1000;'
        )
        copyTarget.setAttribute('id', 'copyTarget')
        document.body.appendChild(copyTarget)
    }
    const input = document.getElementById('copyTarget') as HTMLInputElement
    input.value = seed.toString()
    input.select()
    document.execCommand('copy')
}

const remove = (key: string) => {
    emits('remove', key)
}

const formatTime = (useTime: number) => {
    if (useTime < 100) {
        return useTime + 'ms'
    }
    return (useTime / 1000).toFixed(2) + 's'
}

</script>

<style lang="scss">
.find-record {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba( 0, 0, 0, 0.6);
    padding: 20px;
    .record-list {
        display: flex;
        width: 550px;
        border-bottom: 1px solid var(--placeholder-color);
        & > div:last-child {
            border-right: none;
        }
        & > div {
            text-align: center;
            border-right: 1px solid var(--placeholder-color);
            line-height: 40px;
            position: relative;
            i {
                display: inline-block;
                position: absolute;
                right: 0;
                width: 40px;
                height: 40px;
                cursor: pointer;
            }
            i:hover {
                background-color: rgba(0,0,0,0.85);
                color: var(--noice-text);
            }
        }
        .record-1 {
            width: 100px;
            flex-shrink: 0;
        }
        .record-3 {
            flex: 3;
            overflow: hidden;
            text-overflow: ellipsis;
            position: relative;
            .copy {
                cursor: pointer;
                display: none;
                position: absolute;
                top: 0;
                right: 0px;
                width: 40px;
                height: 40px;
                background-color: rgba(0 ,0,0,0.85);
                z-index: 99;
            }
        }
        .record-3:hover i.copy {
            display: inline-block;
            color: var(--noice-text);
        }
    }
    .record-list:last-child {
        border-bottom: none;
    }
}
</style>