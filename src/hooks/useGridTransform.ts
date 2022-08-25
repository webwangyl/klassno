export interface Transtate {
    vertical:HTMLCollection, // 网格竖线
    verticalX: number[], // 最近的两条竖线原始位置
    yIndex: number[], // 最近的两条竖线索引
    horizontal:HTMLCollection, // 网格横线
    horizontalY: number[], // 最近的两条横线原始位置
    xIndex: number[], // 最近的两条横线索引
}

export interface GridTransform {
    HandleMouseEnter: (e: MouseEvent) => void,
    HandleMouseLeave: () => void,
}

import gsap from 'gsap'

export default function useGridTransform(transtate: Transtate): GridTransform  {
    let { vertical, verticalX, yIndex, horizontal, horizontalY, xIndex } = transtate
    const tl = gsap.timeline()
    return {
        HandleMouseEnter: (e: MouseEvent) => {
            const { width, height, x, y } = (e.target as HTMLElement).getBoundingClientRect()
            yIndex = []
            xIndex = []
            try {
                horizontalY.forEach((el, index) => {
                    if (el >= y) {
                        yIndex[0] = index - 1
                        yIndex[1] = index
                        throw new Error()
                    }
                })
            } catch (error) {}
            try {   
                verticalX.forEach((el, index) => {
                    if (el >= x) {
                        xIndex[0] = index - 1
                        xIndex[1] = index
                        throw new Error()
                    }
                })
            } catch (error) {}
            const offsetx = x + width + 20
            const offsety = y + height + 10
            tl.to(vertical[xIndex[0]], { x: x - 20, duration: .5 })
            tl.to(vertical[xIndex[1]], { x: offsetx, duration: .5 }, '<')
            tl.to(horizontal[yIndex[0]], { y: y - 10, duration: .5 }, '<')
            tl.to(horizontal[yIndex[1]], { y: offsety, duration: .5 }, '<')
        },
        HandleMouseLeave: () => {
            tl.to(vertical[xIndex[0]], { x: verticalX[xIndex[0]], duration: .5 })
            tl.to(vertical[xIndex[1]], { x: verticalX[xIndex[1]], duration: .5 }, '<')
            tl.to(horizontal[yIndex[0]], { y: horizontalY[yIndex[0]], duration: .5 }, '<')
            tl.to(horizontal[yIndex[1]], { y: horizontalY[yIndex[1]], duration: .5 }, '<')
        },
    }
}

