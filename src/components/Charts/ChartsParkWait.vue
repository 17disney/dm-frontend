<template>
  <div class="chart chart--att-count chart--full">
    <div class="inner" :id="id"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import Color from '@/common/color'
import moment from 'moment'

export default {
  props: {
    id: {
      type: String,
      default: 'chart-park-wait'
    },
    data: {
      type: Object
    },
    type: String
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
        symbolSize: 2,
        showSymbol: false,
        lineStyle: {
          width: 3
        },
        itemStyle: {
          normal: {
            color: Color.colorPrimary
          }
        }
      }
      return series
    },

    init() {
      this.chart = echarts.init(document.getElementById(this.id))
      const { data, type } = this
      const { startTime, endTime, date } = data

      var nList = []

      if (type === 'flow') {
        const { flowList = [] } = data
        nList = flowList
      } else {
        const { markList = [] } = data
        nList = markList
      }

      nList = nList.filter(item => item[0] >= moment(date + ' ' + startTime, 'YYYY-MM-DD HH:mm:ss').format('x') && item[0] <= moment(date + ' ' + endTime, 'YYYY-MM-DD HH:mm:ss').format('x'))

      // 设置x轴数据
      const xAxisData = nList.map(_ => moment(_[0], 'x').format('HH:mm'))

      const series = []
      const list = nList.map(_ => _[1])

      const _series = this.initSeries(name, list)
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
            lte: 50000,
            color: Color.colorPrimary
          }, {
            gt: 50000,
            lte: 100000,
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
          splitLine: {
            lineStyle: {
              color: '#EDF1F4'
            }
          }
        }],

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
