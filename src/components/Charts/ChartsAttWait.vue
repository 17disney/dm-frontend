<template>
  <div class="chart chart--att-count chart--full">
    <div class="inner" :id="id"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import Color from '@/common/color'
import moment from 'moment'
import base from '@/common/mixins/base'
import { xToXUTC } from '@/utils'

export default {
  mixins: [base],
  props: {
    id: {
      type: String,
      default: 'chart-att-wait'
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    'data': function(val) {
      this.init()
    }
  },
  methods: {
    initSeries(name, data) {
      const series = {
        name,
        data,
        type: 'line',
        smooth: true,
        // symbol: 'circle',
        symbolSize: 2,
        showSymbol: false,
        lineStyle: {
          width: 3
        },
        itemStyle: {
          normal: {
            // color: '#2492D7',
            color: Color.colorPrimary
            // borderWidth: 3
          }
        }
      }
      return series
    },

    init() {
      this.chart = echarts.init(document.getElementById(this.id))
      const { data, utc } = this
      const { startTime, endTime, date } = data
      let { waitList = [] } = data

      let startX = moment(date + ' ' + startTime, 'YYYY-MM-DD HH:mm:ss').format('x')
      let endX = moment(date + ' ' + endTime, 'YYYY-MM-DD HH:mm:ss').format('x')

      waitList = waitList.filter(_ => {
        _[0] = xToXUTC(_[0], utc)
        return _[0] >= startX && _[0] <= endX
      })

      // 设置x轴数据
      const xAxisData = waitList.map(_ => {
        let val = moment(_[0], 'x').format('H:mm')
        return val
      })

      // const xAxisData = waitList.map(_ => _[0])

      const series = []
      const waitNumList = waitList.map(_ => _[1])

      const _series = this.initSeries('等候时间', waitNumList)
      series.push(_series)

      const option = {
        grid: {
          top: 50,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },

        visualMap: {
          top: 10,
          right: 10,
          pieces: [{
            gt: 0,
            lte: 60,
            color: Color.colorPrimary
          }, {
            gt: 60,
            lte: 300,
            color: Color.colorRed
          }]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#243247'
            }
          }
        },
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#5C6B80'
            }
          },
          // axisLabel: {
          //   margin: 10,
          //   textStyle: {
          //     fontSize: 12
          //   }
          // },
          splitLine: {
            lineStyle: {
              color: '#EDF1F4'
            }
          }
        }],

        legend: {
          data: ['等候时间']
        },

        xAxis: [{
          type: 'category',
          // boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#5C6B80'
            }
          },
          data: xAxisData
        }],
        series
      }

      this.chart.setOption(option)
    }
  }
}
</script>
