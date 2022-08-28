import { Directive } from 'vue'

const vBreakup:Directive<HTMLElement> = {
    created: function(el, binding) {
        // 拆碎段落
        const source = el.innerText
        let num = 1
        let classname = ''
        if (binding.value) {
            num = binding.value.num
            classname = binding.value.classname
        }
        const len = el.innerText.length
        let template = ''
        for (let i = 0; i < len; i+=num) {
            template += '<span' + (classname ? ` class='${classname}'>` : '>') + source.slice(i, i + num) + '</span>'
        }
        el.innerHTML = template
    }
}

export default vBreakup
