import * as echarts from 'echarts/core'
import { LineSeriesOption, FunnelSeriesOption, BarSeriesOption, GraphSeriesOption } from 'echarts/charts'
import { GridComponentOption, TooltipComponentOption, DatasetComponentOption, LegendComponentOption } from 'echarts/components'

export type ECOption = echarts.ComposeOption<
    | LineSeriesOption
    | FunnelSeriesOption
    | BarSeriesOption
    | GraphSeriesOption
    | GridComponentOption
    | TooltipComponentOption
    | DatasetComponentOption
    | LegendComponentOption
>
