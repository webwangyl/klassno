import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'

interface MenuItem {
    key: string,
    label: string,
    url: string,
}

interface IconItem {
    url: string,
    link: string,
    label: string,
}

interface ICaseItem {
	title: string;
	key: string;
}
export interface State {
    audioStatus: boolean,
    noices: string[],
    menuList: MenuItem[],
    theme: string,
    iconList: IconItem[],
    caseList: ICaseItem[],
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        audioStatus: false,
        noices: ['<span class="text">S</span>', 'C', 'R', 'O', 'L', 'L', '&nbsp', 'T', 'O', '&nbsp', 'D', 'I', 'S', 'C', 'O', 'V', 'E', 'R'],
        menuList: [
            { key: 'home', label: 'Home', url: '/home' },
            { key: 'blog', label: 'My Blog', url: '/blog' },
            // { key: 'timeline', label: 'Timeline', url: '/timeline' },
            { key: 'coolcase', label: 'Cool Case', url: '/case' },
            { key: 'collection', label: 'My Collection', url: '/collection' },
            // { key: 'sugar', label: 'The Beauty Of Data', url: '/sugar' },
            { key: 'three', label: 'Three World', url: '/three' },
        ],
        theme: '',
        iconList: [
            { url: 'vite.svg', link: 'https://vitejs.cn/', label: 'Vite' },
            { url: 'vue.svg', link: 'https://vuejs.org/', label: 'Vue' },
            { url: 'gsap.ico', link: 'https://greensock.com/', label: 'GreenSock' },
            { url: 'threejs_white.ico', link: 'https://threejs.org/', label: 'Three.js' },
            { url: 'elementplus.svg', link: 'https://element-plus.gitee.io/zh-CN/', label: 'Element Plus' },
        ],
        caseList: [
            {
                title: "Running Ball",
                key: "RunningBall",
            },
            {
                title: "Raining",
                key: "Thunderstorm",
            },
            {
                title: "Crazy Click",
                key: "DomMatrix",
            },
            {
                title: "Magic Card",
                key: 'MagicCard',
            },
            {
                title: "Volume Sound",
                key: 'VolumeSound',
            },
            {
                title: "Star Night",
                key: 'StarNight'
            },
            {
                title: "Muti Layer",
                key: 'MutiLayer'
            },
            {
                title: "Color Triangle",
                key: 'ColorTriangle'
            },
        ],
    },
    mutations,
    actions,
    modules,
})

export function useStore() {
    return baseUseStore(key)
}
