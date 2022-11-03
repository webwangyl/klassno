import { INode } from "./three"

export default function (text: string, { x, y, name }: INode) {
    this.w = window.innerWidth
    this.h = window.innerHeight
    this.el = document.createElement('div')
    this.el.classList.add('three-text')
    this.el.classList.add(name)
    this.el.innerText = text
    this.el.style.left = Math.round(this.w / 2) + x + 'px'
    this.el.style.top = Math.round(this.h / 2) - y + 'px'
    this.resize = () => {
        this.w = window.innerWidth
        this.h = window.innerHeight
        this.el.x = Math.round(this.w / 2) + x
        this.el.y = Math.round(this.h / 2) - y
    }
}
