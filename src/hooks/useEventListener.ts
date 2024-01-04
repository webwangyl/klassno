import { onMounted, onBeforeUnmount } from 'vue'

export default function useEventListener(ele: Element | Window, eventName: string, fn: any) {

    onMounted(() => {
        ele.addEventListener(eventName, fn)
    })
    onBeforeUnmount(() => {
        ele.removeEventListener(eventName, fn)
    })
}