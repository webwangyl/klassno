import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'

export interface State {
    audioStatus: boolean,
    noices: string[],
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        audioStatus: false,
        noices: ['<span class="text">S</span>', 'C', 'R', 'O', 'L', 'L', '&nbsp', 'T', 'O', '&nbsp', 'D', 'I', 'S', 'C', 'O', 'V', 'E', 'R'],
    },
    mutations,
    actions,
    modules,
})

export function useStore() {
    return baseUseStore(key)
}
