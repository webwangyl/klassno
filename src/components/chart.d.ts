import * as echarts from 'echarts/core'
import { LineSeriesOption } from 'echarts/charts'
import { GridComponentOption, TooltipComponentOption, GraphicComponentOption } from 'echarts/components'

export type ECOption = echarts.ComposeOption<
    | LineSeriesOption
    | GridComponentOption
    | TooltipComponentOption
    | GraphicComponentOption
>
