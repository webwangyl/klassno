<template>
    <div class="blog-container">
        <div class="blog-content"></div>
        <div class="blog-user">
            <img class="user-header" src="@/assets/images/blog/header.jpeg" alt="">
            <p class="info-text user-introduce">Hello,I'm ulin Wang and that is my cool face.</p>
            <p class="elsewhere">Elsewhere</p>
            <div class="elsewhere-box">
                <div class="elsewhere-list" v-for="item in elsewhereList" :key="item.label">
                    <img class="elsewhere-icon" :src="required(item.src)" alt="">
                    <span class="elsewhere-span">{{ item.label }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const required = (name: string) => {
  return new URL(`/src/assets/images/blog/${name}.png`, import.meta.url).href
}
const elsewhereList = [
    { src: 'github', label: 'github' },
    { src: 'Sina-Weibo', label: 'Sina-Weibo' }
]
</script>

<style lang="scss" scoped>
.blog-container {
    width: calc(100% - 300px);
    min-height: calc(100vh - 180px);
    margin: 0 auto;
    background-color: #333;
    border-radius: 20px;
    display: flex;
    padding: 20px 0;
    .blog-content {
        flex: 1;
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
            color: $primary-second-title;
            border-bottom: 1px solid $primary-second-title;
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
                .elsewhere-icon {
                    width: 20px;
                    height: 20px;
                    margin-right: 8px;
                }
                .elsewhere-span {
                    color: $primary-text;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
