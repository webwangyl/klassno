export default {
    created(el: HTMLElement, binding) {
        const text = el.innerText
        const len = text.length
        let gutter:number = 1
        if (binding.value) {
            gutter = (binding.value.gutter || 0) + 1
        }
        let template = ''
        if (len <= 20) {
            for (let i = 0; i < len; i++) {
                template += `
                    <span class="letter">
                        <span class="dummy" style="visibility: hidden;">${text[i]}</span>
                        ${isInteger(i / gutter) ? '<!--' : ''}
                        <span class="letter-inner red">${text[i]}</span>
                        <span class="letter-inner green">${text[i]}</span>
                        <span class="letter-inner yellow">${text[i]}</span>
                        ${isInteger(i / gutter) ? '-->' : ''}
                        <span class="letter-inner default">${text[i]}</span>
                    </span>
                `
            }
        } else {
            template = el.innerText
        }
        el.innerHTML = template
    }
}

function isInteger(num: number) {
    return (num | 0) === num
}
