import { Directive } from 'vue'

interface IInterval extends HTMLElement{
    __vueSetInterval__: number;
    __elementObserve__: ResizeObserver;
    __initLock__: boolean;
}

const vResize:Directive<IInterval> = {
    // 指令的名称
    mounted(el, binding) {
        // el为绑定的元素，binding为绑定给指令的对象
        let width = ''
        let height = ''
        el.__initLock__ = false
        if (window.ResizeObserver) {
            el.__elementObserve__ = new ResizeObserver(() => {
                if (el.__initLock__) {
                    binding.value()
                    el.__initLock__ = true
                }
            })
            el.__elementObserve__.observe(el)
        } else {
            function isReize() {
                const style = document.defaultView.getComputedStyle(el)
                if (width !== style.width || height !== style.height) {
                    binding.value()
                }
                width = style.width
                height = style.height
            }
            el.__vueSetInterval__ = window.setInterval(isReize, 300)
        }
    },
    unmounted(el) {
        if (el.__vueSetInterval__) {
            clearInterval(el.__vueSetInterval__)
        } else {
            el.__elementObserve__.unobserve(el)
        }
    },
}

export default vResize
