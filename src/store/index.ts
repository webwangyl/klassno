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

export interface State {
    audioStatus: boolean,
    noices: string[],
    menuList: MenuItem[],
    theme: string,
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        audioStatus: false,
        noices: ['<span class="text">S</span>', 'C', 'R', 'O', 'L', 'L', '&nbsp', 'T', 'O', '&nbsp', 'D', 'I', 'S', 'C', 'O', 'V', 'E', 'R'],
        menuList: [
            { key: 'home', label: 'Home', url: '/home' },
            { key: 'blog', label: 'My Blog', url: '/blog' },
            { key: 'Timeline', label: 'Timeline', url: '/Timeline' },
            { key: 'sugar', label: 'The Beauty Of Data', url: '/sugar' },
        ],
        theme: '',
    },
    mutations,
    actions,
    modules,
})

export function useStore() {
    return baseUseStore(key)
}
