<template>
    <div class="vs-padding">
        <div class="blog-container">
            <div class="blog-content" v-if="!preview">
                <div v-for="(item, index) in blogList" :key="index" class="blog-list-container">
                    <p class="blog-title page-title" @click="getContent(item)">{{ item.title }}</p>
                    <div class="main-box">
                        <p class="blog-time info-text">
                            Posted {{ item.time }}
                            <ElTag v-for="(tag, index) in item.tags" :key="index" :type="tag.type" class="my-tag">{{ tag.name }}</ElTag>
                        </p>
                        <p class="blog-preview info-text">{{ item.preview }}...</p>
                    </div>
                </div>
            </div>
            <Elsewhere @search="search"></Elsewhere>
        </div>
    </div>
</template>

<script lang="ts" setup>
import mdJson from '../../public/json/md.json'
import { ElTag } from 'element-plus'
import { router } from '../router'
import Elsewhere from '../components/blog/elsewhere.vue';
import { ItagItem, IBlogItem } from './page'
import { reactive, ref } from 'vue';

const prop = defineProps<{
    preview?: boolean
}>()

const preview = prop.preview || false

let blogList = ref<IBlogItem[]>(mdJson as IBlogItem[])

const getContent = async ({ filename }: IBlogItem) => {
    router.push({
        path: '/content',
        query: {
            filename: filename
        },
    })
}

const search = (type: string) => {
    if (type === 'none') {
        blogList.value = mdJson as IBlogItem[]
    } else {
        blogList.value = (mdJson as IBlogItem[]).filter(el => el.tags.filter(el => el.name === type).length)
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

    :deep(.vuepress-markdown-body) {
        margin-left: 20px;
    }
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
                cursor: pointer;
            }
            .blog-title:hover {
                text-decoration: underline;
                text-decoration-thickness: 1px;
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
                    word-break: break-all;
                }
            }
        }
    }
}
</style>
