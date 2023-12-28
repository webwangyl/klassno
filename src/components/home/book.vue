<template>
    <div id="book" class="book">
        <div class="some-this">
            <div class="tab-header">
                <div v-for="(item, index) in tabList" @click="tabClick(index, item)" class="tab-item" :class="{ 'is-current': currentIndex === index }">{{ item.label }}</div>
            </div>
            <div v-show="currentIndex === 0" class="tab-container">
                <div v-for="(item, index) in ProblemList" :key="item.filename" class="container-list">
                    <p v-if="index === 0" class="list-title" @click="getContent(item)">
                        <span class="list-index">{{ index + 1 }}、</span>
                        <span v-breakup="{ num: 1, classname: 'Problem-firstline' }">{{ item.title }}</span>
                    </p>
                    <p v-else class="list-title gsap-ctr" @click="getContent(item)">
                        <span class="list-index">{{ index + 1 }}、</span>{{ item.title }}
                    </p>
                    <p class="list-preview gsap-ctr">{{ item.preview }}</p>
                </div>
            </div>
            <div v-show="currentIndex === 1" class="tab-container">
                <div v-for="(item, index) in ArticleList" :key="item.filename" class="container-list">
                    <p v-if="index === 0" class="list-title" @click="getContent(item)">
                        <span class="list-index">{{ index + 1 }}、</span>
                        <span v-breakup="{ num: 1, classname: 'Article-firstline' }">{{ item.title }}</span>
                    </p>
                    <p v-else class="list-title gsap-ctr" @click="getContent(item)">
                        <span class="list-index">{{ index + 1 }}、</span>{{ item.title }}
                    </p>
                    <p class="list-preview gsap-ctr">{{ item.preview }}</p>
                </div>
            </div>
        </div>
        <div class="read-more">
            <p class="noice-text" @click="toBlog">Read More</p>
            <div class="grow rotate-right">
				<span class="grow-background"></span>
				<span class="triangle"></span>
			</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap';
import { onMounted, ref } from 'vue';
import router from '../../router';
import mdJson from '../../../public/json/md.json'
import { IBlogItem } from '../../pages/page'


let currentIndex = ref<number>(0)

interface ITabItem {
    label: 'Problem' | 'Article'
}

const tabList: ITabItem[] = [
    { label: 'Problem' },
    { label: 'Article' },
]
let preStepClassName: string

const ProblemList: IBlogItem[] = mdJson.filter(el => el.tags.filter(tag => tag.name === 'Problem').length).slice(0, 3) as IBlogItem[]
const ArticleList: IBlogItem[] = mdJson.filter(el => el.tags.filter(tag => tag.name === 'Article').length).slice(0, 3) as IBlogItem[]

const tabClick = (index: number, { label }: ITabItem) => {
    if (currentIndex.value === index) return
    currentIndex.value = index
    gsapCtrShow(`.${label}-firstline`)
}

const gsapCtrShow = (stepClassname: string) => {
    gsap.killTweensOf('.gsap-ctr')
    preStepClassName && gsap.killTweensOf(preStepClassName)
    preStepClassName = stepClassname
    gsap.to('.gsap-ctr', {
        opacity: 0,
        duration: 0,
    })
    gsap.from(stepClassname, {
        scrollTrigger: {
            trigger: '.book',
            scroller: '.main',
            start: 'top 50%',
            end: 'bottom 60%',
            toggleActions: 'restart pause pause pause',
        },
        opacity: 0,
        duration: .1,
        stagger: .2,
        onComplete: () => {
            gsap.to('.gsap-ctr', {
                opacity: 1,
                duration: .3,
                delay: .5,
            })
        }
    })
}

onMounted(() => {
    gsap.from('.book', {
        scrollTrigger: {
            trigger: '.book',
            scroller: '.main',
            start: 'top 50%',
            end: 'bottom 60%',
            toggleActions: 'restart pause resume reverse',
        },
        x: -200,
        opacity: 0,
        duration: 1,
    })
    gsapCtrShow('.Problem-firstline')
    gsap.to('.gsap-ctr', {
        opacity: 0,
        duration: 0,
        scrollTrigger: {
            trigger: '.book',
            scroller: '.main',
            start: 'top 50%',
            end: 'bottom 60%',
            toggleActions: 'restart pause resume reverse',
        },
    })
})


const toBlog = () => {
    router.push({
        path: '/blog'
    })
}

const getContent = ({ filename }: IBlogItem) => {
    router.push({
        path: '/content',
        query: {
            filename: filename
        },
    })
}
</script>

<style lang="scss" scoped>
div.book {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 600px;
    .dom-matrix {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .some-this {
        width: 600px;
        height: 400px;
        border: 1px solid var(--placeholder-color);
        border-radius: 4px;
        .tab-header {
            height: 48px;
            background-color: var(--color-background-2);
            padding: 8px 8px 0;
            display: flex;
            border-bottom: 1px solid var(--placeholder-color);
            .tab-item {
                height: 100%;
                padding: 0 12px;
                line-height: 32px;
                cursor: pointer;
            }
            .tab-item:hover {
                color: var(--noice-text);
            }
            .tab-item.is-current {
                background-color: var(--color-background-1);
                border: 1px solid var(--placeholder-color);
                border-bottom: none;
                transform: translateY(1px);
                border-radius: 2px 2px 0 0;
                color: var(--color-inside);
            }
        }
        .tab-container {
            height: 350px;
            background-color: var(--color-background-1);
            padding: 20px;
        }
    }
    .read-more {
        padding-left: 20px;
        .noice-text {
            margin-bottom: 20px;
            cursor: pointer;
        }
        .rotate-right {
            height: 100px;
            transform: rotate(270deg);
            transform-origin: top;
        }
    }
    .container-list {
        .list-title {
            line-height: 40px;
            font-size: 18px;
            color: var(--primary-second-title);
            cursor: pointer;
            .list-index {
                width: 30px;
                display: inline-block;
            }
        }
        .list-title:hover {
            text-decoration: underline;
            text-decoration-thickness: 1px;
            color: var(--noice-text);
        }
        .list-preview {
            padding-left: 30px;
            color: var(--primary-text);
            font-size: 14px;
            line-height: 22px;
        }
    }
    .gsap-ctr {
        opacity: 0;
    }
}
</style>