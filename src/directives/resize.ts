import { Directive } from 'vue'

interface IInterval extends HTMLElement{
    __vueSetInterval__: number;
    __elementObserve__: ResizeObserver;
}

const vResize:Directive<IInterval> = {
    // 指令的名称
    mounted(el, binding) {
        // el为绑定的元素，binding为绑定给指令的对象
        let width = ''
        let height = ''
        if (window.ResizeObserver) {
            el.__elementObserve__ = new ResizeObserver(() => {
                binding.value()
            })
            el.__elementObserve__.observe(el)
        } else {
            function isReize() {
                const style = document.defaultView.getComputedStyle(el)
                if (width !== style.width || height !== style.height) {
                    binding.value() // 关键
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
