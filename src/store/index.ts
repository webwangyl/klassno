import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'

export interface State {
    audioStatus: boolean
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        audioStatus: false,
    },
    mutations,
    actions,
    modules,
})

export function useStore() {
    return baseUseStore(key)
}
