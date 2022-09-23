<template>
    <div class="vs-padding">
        <div class="blog-container">
            <div class="blog-content" v-if="!preview">
                <div v-for="(item, index) in blogList" :key="index" class="blog-list-container">
                    <p class="blog-title page-title">{{ item.title }}</p>
                    <div class="main-box">
                        <p class="blog-time info-text">Posted {{ item.time }}</p>
                        <p class="blog-preview info-text">{{ item.preview }}...</p>
                    </div>
                </div>
            </div>
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
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
export interface IBlogItem {
    title: string,
    time: string,
    preview: string,
}

export interface IElsewhereItem {
    src: string,
    label: string,
    url: string,
}

const prop = defineProps<{
    preview?: boolean
}>()

const preview = prop.preview || false

const required = (name: string) => {
  return new URL(`/src/assets/images/blog/${name}.png`, import.meta.url).href
}

const elsewhereList: IElsewhereItem[] = [
    { src: 'github', label: 'github', url: 'https://github.com/webwangyl', },
    { src: 'Sina-Weibo', label: 'Sina-Weibo', url: '' },
    { src: 'npm', label: 'npm', url: 'https://www.npmjs.com/~wangyulin' },
    { src: 'codepen', label: 'codepen', url: 'https://codepen.io/webwangyl' }
]

const blogList: IBlogItem[] = [
    { title: 'asdasdas把咖啡馆代理商会计分录收到', time: '2020:2!@', preview: '结案率看帅哥克拉几十个捣乱时光倒流科技感控制臂嘎良好的' },
    { title: 'asdasdas把咖啡馆代理商会计分录收到', time: '2020:2!@', preview: '结案率看帅哥克拉几十个捣乱时光倒流科技感控制臂嘎良好的' },
    { title: 'asdasdas把咖啡馆代理商会计分录收到', time: '2020:2!@', preview: '结案率看帅哥克拉几十个捣乱时光倒流科技感控制臂嘎良好的' },
    { title: 'asdasdas把咖啡馆代理商会计分录收到', time: '2020:2!@', preview: '结案率看帅哥克拉几十个捣乱时光倒流科技感控制臂嘎良好的' },
    { title: 'asdasdas把咖啡馆代理商会计分录收到', time: '2020:2!@', preview: '结案率看帅哥克拉几十个捣乱时光倒流科技感控制臂嘎良好的' },
]

const toElsewhere = (e: MouseEvent) => {
    const url = (e.target as HTMLElement).getAttribute('data-url')
    if (url) {
        window.open(url, '_target')
    }
}
</script>

<style lang="scss" scoped>
.vs-padding {
    padding-bottom: 20px;
}
.blog-container {
    width: calc(100% - 300px);
    min-height: calc(100vh - 240px);
    margin: 0 auto;
    background-color: var(--background-blod);
    border-radius: 20px;
    display: flex;
    padding: 20px 0;
    .blog-content {
        flex: 1;
        .blog-list-container {
            .blog-title {
                background-color: #ff931d;
                padding-left: 20px;
                border-radius: 32px 0 0 32px;
                white-space: pre-wrap;
                margin-bottom: 0;
                transform: translateX(-32px);
            }
            .main-box {
                padding-right: 32px;
                .blog-time {
                    background-color: #ffc244;
                    color: #000;
                    line-height: 32px;
                }
                .blog-preview {
                    padding: 20px 24px;
                    color: var(--color-inside);
                }
            }
        }
    }
    .blog-user {
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 25px;
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
                    color: var(--primary-text);
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
