<template>
    <div class="vs-padding">
        <div class="blog-container">
            <div class="blog-content">
                <MdPreview :text="text"></MdPreview>
            </div>
            <Elsewhere></Elsewhere>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MdPreview from '../components/base/mdPreview.vue';
import { router } from '../router'
import Elsewhere from '../components/blog/elsewhere.vue';

const filename = router.currentRoute.value.query.filename as string
let text = ref('')
let isError = ref(false)
const getContent = async (filename: string) => {
    try {  
        const a = await import(`../../public/md/${filename}.md?raw`)
        text.value = a.default
    } catch (error) {
        isError.value = true
    }
}
getContent(filename)
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
    }
}
</style>
