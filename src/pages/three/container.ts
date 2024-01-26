// hover的展示盒子及内容

export function getBox() {
    const div = document.createElement('div')
    return div
}

export function getText(title: string, label: string) {
    return label
}

export function getEl(title: string, label: string) {
    const box = getBox()
    const template = getText(title, label)
    box.innerHTML = template
    return box
}

export default getEl
