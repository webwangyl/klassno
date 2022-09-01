<template>
    <div class="theme">
        <div class="color-picker-container">
            <div class="color-picker-item" v-for="item in colors" :key="item.key">
                <label>{{ item.label }}</label>
                <el-color-picker class="color-picker" v-model="item.value" size="small" popper-class="color-picker-pop" show-alpha @change="change(item, $event)"></el-color-picker>
            </div>
            <div class="my-button" @click="init">reset</div>
            <div @click="save">save</div>
        </div>
        <div id="preview" class="preview-container">
            <p class="page-title">PREVIEW</p>
            <div class="preview-content">
                <div class="preview">
                    <Profile :preview="preview"></Profile>
                </div>
                <div class="preview">
                    <blog :preview="preview"></blog>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { ElColorPicker } from 'element-plus'
import dark from '../theme/dark';
import { Itheme } from '../theme/Itheme'
import Profile from '../components/home/profile.vue';
import Blog from './blog.vue'

const preview = true
const colors: Itheme[] = reactive(dark)

const app = document.documentElement
let previewElement: HTMLElement

const init = () => {
    previewElement = document.getElementById('preview') as HTMLElement
    dark.forEach(themeItem => {
        const value = app.style.getPropertyValue(themeItem.key)
        const key = themeItem.key
        const label = themeItem.label
        previewElement.style.setProperty(key, value)
        const i = colors.findIndex(item => item.key == key)
        colors.splice(i ,1, { key, value, label })
    })
}

const save = () => {
    colors.forEach(colorItem => {
        app.style.setProperty(colorItem.key, colorItem.value)
    })
}

onMounted(() => init())

const change = ({ key, value }) => {
    previewElement.style.setProperty(key, value)
}
</script>

<style lang="scss" scoped>
.theme {
    padding: 20px 40px 60px;
    display: flex;
    height: calc(100vh - 120px);
    .color-picker-container {
        width: 190px;
        .color-picker-item {
            height: 40px;
            label {
                display: inline-block;
                width: 160px;
                font-weight: 200;
            }
            .color-picker {
                height: 40px;
            }
        }
    }
    .preview-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        .preview-content {
            display: flex;
            width: 100%;
            flex: 1;
            .preview {
                flex: 1;
                padding: 20px;
                border: 5px solid rgb(99, 91, 23);
                margin: 0 12px;
                background-color: var(--color-theme);
                &:deep(.blog-container) {
                    width: 300px;
                    min-height: 0;
                    height: 100%;
                }
                &:deep(.grow) {
                    right: 0;
                }
                &:deep(.noice-position), &:deep(.title-position), &:deep(.info-position) {
                    right: 20px;
                }
            }
        }
    }
}
</style>
