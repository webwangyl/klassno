<template>
    <div class="blog-user">
        <img class="user-header" src="@/assets/images/blog/header.jpeg" alt="">
        <p class="info-text user-introduce">Hello,I'm ulin Wang and that is my cool face.</p>
        <p class="elsewhere">Elsewhere</p>
        <div class="elsewhere-box" @click="toElsewhere">
            <div class="elsewhere-list" v-for="item in elsewhereList" :key="item.label" :data-url="item.url">
                <img class="elsewhere-icon" :src="required(item.src)" :data-url="item.url" alt="">
                <span class="elsewhere-span" :data-url="item.url">{{ item.label }}</span>
            </div>
        </div>
        <p class="elsewhere">Tag</p>
        <div class="full-width">
            <ElTag class="my-tag" :class="{'active': isActive === 'Problem'}" @click="search('Problem')">Problem</ElTag>
            <ElTag class="my-tag" :class="{'active': isActive === 'Article'}" @click="search('Article')">Article</ElTag>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ElTag } from 'element-plus'
import { ref } from 'vue'
export interface IElsewhereItem {
    src: string,
    label: string,
    url: string,
}

const emit = defineEmits<{
    (event: "search", type: string): void;
}>()

let isActive = ref<string>('none')

const required = (name: string) => {
  return new URL(`/src/assets/images/blog/${name}.png`, import.meta.url).href
}

const elsewhereList: IElsewhereItem[] = [
    { src: 'github', label: 'github', url: 'https://github.com/webwangyl', },
    { src: 'Sina-Weibo', label: 'Sina-Weibo', url: '' },
    { src: 'npm', label: 'npm', url: 'https://www.npmjs.com/~wangyulin' },
    { src: 'codepen', label: 'codepen', url: 'https://codepen.io/webwangyl' }
]

const toElsewhere = (e: MouseEvent) => {
    const url = (e.target as HTMLElement).getAttribute('data-url')
    if (url) {
        window.open(url, '_target')
    }
}

const search = (type: string) => {
    if (isActive.value === type) {
        isActive.value = 'none'
        emit('search', 'none')
    } else {
        isActive.value = type
        emit('search', type)
    }
}
</script>

<style lang="scss">
.blog-user {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 25px;
    background-color: var(--background-blod);
    .user-header {
        width: 250px;
        margin-bottom: 12px;
    }
    .user-introduce {
        text-indent: 0;
    }
    .elsewhere {
        margin: 10px 0;
        padding-bottom: 4px;
        text-align: left;
        width: 100%;
        color: var(--primary-second-title);
        border-bottom: 1px solid var(--primary-second-title);
    }
    .elsewhere-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        .elsewhere-list {
            width: 50%;
            text-align: center;
            display: flex;
            height: 30px;
            align-items: center;
            cursor: pointer;
            .elsewhere-icon {
                width: 20px;
                height: 20px;
                margin-right: 8px;
            }
            .elsewhere-span {
                font-size: 14px;
            }
        }
        .elsewhere-list:hover {
            @include hover-text;
        }
    }
    .my-tag {
        cursor: pointer;
    }
    .my-tag.active {
        background-color: var(--noice-text);
        border: none;
        color: var(--color-theme);
    }
}
</style>
