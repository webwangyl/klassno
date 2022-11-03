<template>
    <div class="my-collection">
        <div class="cate-list" v-for="item in cateList" :key="item.key">
            <p class="cate-title info-text">{{ item.name }}</p>
            <div class="cate-card-list flex-start">
                <div class="cate-card" v-for="web in filterList(item.key)" :key="web.name" @click="toHref(web)">
                    <div class="card-title">
                        <div class="logo-name flex-start">
                            <div class="card-logo" :style="{ backgroundImage: `url(${required(web.icon)})` }"></div>
                            <span>{{ web.name }}</span>
                        </div>
                    </div>
                    <p class="card-details">{{ web.details }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

interface IWebsite {
    url: string,
    name: string,
    cate: 'documents' | 'design' | 'freetool',
    icon?: string,
    details?: string,
}

const cateList = [
    { name: 'Official Documents', key: 'documents' },
    { name: 'Design', key: 'design' },
    { name: 'Free Tool', key: 'freetool' },
]

const websiteList: IWebsite[] = [
    // documents
    { url: 'https://developer.mozilla.org/zh-CN/', name: 'MDN', icon: 'mdn.png', cate: 'documents', details: 'MDN Web Docs（简称MDN）是一个汇集众多Mozilla基金会产品和网络技术开发文档的免费网站。' },
    { url: 'https://vitejs.cn/', name: 'Vite', icon: 'vite.svg', cate: 'documents', details: '下一代前端开发与构建工具。' },
    { url: 'https://vuejs.org/', name: 'Vue.js', icon: 'vue.svg', cate: 'documents', details: 'Vue 是一套用于构建用户界面的渐进式JavaScript框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用（SPA）提供驱动。' },
    { url: 'https://element-plus.gitee.io/zh-CN/', name: 'Element Plus', icon: 'elementplus.svg', cate: 'documents', details: '基于 Vue 3，面向设计师和开发者的组件库。' },
    { url: 'https://greensock.com/', name: 'GreenSock', icon: 'gsap.ico', cate: 'documents', details: 'GreenSock动画平台（GSAP）可以对JavaScript可以操作的所有内容进行动画处理（CSS属性，SVG，React，画布，通用对象等），同时解决了不同浏览器上存在的兼容性问题，而且速度极快（比jQuery 快20倍）。大约有1000万个站点和许多主要品牌都使用 GSAP。' },
    { url: 'https://threejs.org/', name: 'Three.js', icon: 'threejs_white.ico', cate: 'documents', details: 'Three.js 是一款运行在浏览器中的 3D 引擎，你可以用它创建各种三维场景，包括了摄影机、光影、材质等各种对象。你可以在它的主页上看到许多精彩的演示。不过，这款引擎还处在比较不成熟的开发阶段，其不够丰富的 API 以及匮乏的文档增加了初学者的学习难度（尤其是文档的匮乏）three.js的代码托管在github上面。' },
    // design
    { url: 'https://www.zcool.com.cn/', name: 'ZCOOL', icon: 'zcool.ico', cate: 'design', details: '站酷ZCOOL,中国设计师互动平台。深耕设计领域十五年,站酷聚集了1500万设计师、摄影师、插画师、艺术家、创意人,设计创意群体中具有较高的影响力与号召力。' },
    { url: 'https://www.ui.cn/', name: 'UICN', icon: 'uicn.ico', cate: 'design', details: 'UI中国用户体验平台,中国用户体验联盟理事单位。国内极具影响力的设计平台之一。十多年来,携手会员150万+,共同致力于为设计师与企业搭建健康的设计生态!' },
    // free tool
    { url: 'https://caniuse.com/', name: 'Can I use', icon: 'caniuse.png', cate: 'freetool', details: 'Can I use 提供了最新的浏览器支持表，用于支持桌面和移动web浏览器上的前端web技术。' },
    { url: 'https://www.json.cn/', name: 'JSON', icon: '', cate: 'freetool', details: 'JSON在线解析、格式化、压缩、编辑器以及JSON与XML转换。' },
    { url: 'https://yasuo.xunjiepdf.com/video/', name: '视频压缩', icon: 'zip.ico', cate: 'freetool', details: '视频、图片、文档压缩。' },
    { url: 'https://onlineconvertfree.com/zh/convert/', name: '格式转换', icon: 'format.ico', cate: 'freetool', details: '视频、图片、文档格式转换。' },
    { url: 'http://tools.jb51.net/code/css3path', name: 'CSS3 clip-path', icon: '', cate: 'freetool', details: 'CSS3裁剪路径可视化编辑生成代码。' },
    { url: 'https://9elements.github.io/fancy-border-radius/', name: 'Fancy Border Radius', icon: 'border-radius.png', cate: 'freetool', details: '可视化生成各种复杂图形的border-radius。' },
]

const required = (icon: string) => {
  return new URL(`/src/assets/images/about/${icon}`, import.meta.url).href
}

const filterList = (key: string) => {
    return websiteList.filter(el => el.cate === key)
}

const toHref = (web: IWebsite) => {
    window.open(web.url, '_target')
}

</script>

<style lang="scss">
.my-collection {
    height: 100%;
    padding: 20px 100px 60px;
    overflow: auto;
    .cate-list {
        margin-bottom: 40px;
        .cate-title {
            text-indent: 0;
            padding-left: 8px;
            line-height: 14px;
            border-left: 4px solid var(--noice-text);
            color: var(--color-inside);
            margin-bottom: 20px;
        }
        .cate-card-list {
            .cate-card {
                @include circle-image;
                @include flex-box(space-between, flex-start, column);
                width: 280px;
                height: 120px;
                background-color: rgba(255, 255, 255, .1);
                border-radius: 4px;
                margin-right: 20px;
                margin-bottom: 20px;
                padding: 20px 16px;
                cursor: pointer;
                .card-title {
                    @include flex-box(space-between);
                    height: 32px;
                    width: 100%;
                    .logo-name {
                        height: 28px;
                        align-items: center;
                    }
                    .card-logo {
                        width: 28px;
                        height: 28px;
                        border-radius: 50%;
                        margin-right: 8px;
                        background-size: contain;
                    }
                }
                .card-details {
                    @include line-clamp;
                    font-size: 14px;
                    color: var(--placeholder-color);
                }
            }
            .cate-card:hover {
                .card-title {
                    @include hover-text;
                }
            }
        }
    }
    .flex-start {
        @include flex-box(flex-start, flex-start);
    }
}
</style>
