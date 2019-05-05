<template>
  <div class="chart chart--att-count chart--full">
    <div :id="id" class="inner"/>
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
      default: 'chart-ticket-date'
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
  watch: {
    'data': function(val) {
      this.init()
    }
  },
  mounted() {
    this.init()
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
        areaStyle: {
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
      const { data } = this
      const { availableList } = data

      if (!availableList) return

      // 设置x轴数据
      const xAxisData = availableList.map(_ => moment(_[0], 'x').format('MM-DD HH:mm'))

      const saleList = availableList.map(_ => {
        return _[1]
      })
      const series = []

      const _series = this.initSeries('售票量', saleList)
      series.push(_series)

      const option = {
        grid: {
          top: 50,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
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
