<template>
  <div class="chart chart--full">
    <div class="inner" :id="id"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import moment from 'moment'

export default {
  props: {
    id: {
      type: String,
      default: 'chart'
    },
    data: {
      type: Array,
      default: []
    },
    type: {
      type: String
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    'data': function() {
      this.initChart()
    }
  },
  methods: {
    initSeries() {
      const { data, type } = this
      let seriesData = []

      if (type === 'att') {
        seriesData = data.map(_ => _['waitAvg'])
      } else if (type === 'park') {
        seriesData = data.map(_ => _['flowAvg'])
      } else if (type === 'ticket') {
        seriesData = data.map(_ => {
          return 20000 - _['availableCount']
        })
      }
      const series = [{
        name: '等候时间',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 2,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#2492D7'
            }, {
              offset: 0.8,
              color: '#A1D4EE'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },

        itemStyle: {
          normal: {
            color: '#2492D7',
            borderColor: '#243247',
            borderWidth: 12
          }
        },
        data: seriesData
      }]

      return series
    },

    initXAxis() {
      const { data, type } = this
      let xAxisData = []

      if (type === 'att') {
        xAxisData = data.map(_ => moment(_['date'], 'YYYY-MM-DD').format('MM/DD'))
      } else if (type === 'park') {
        xAxisData = data.map(_ => moment(_['date'], 'YYYY-MM-DD').format('MM/DD'))
      } else if (type === 'ticket') {
        xAxisData = data.map(_ => moment(_['date'], 'YYYY-MM-DD').format('MM/DD'))
      }

      const xAxis = [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#5C6B80'
          }
        },
        data: xAxisData
      }]
      return xAxis
    },

    initLegend() {
      const { type } = this
      let legendData = []
      if (type === 'att') {
        legendData = ['等候时间']
      } else if (type === 'att') {
        legendData = ['客流量']
      } else if (type === 'ticket') {
        legendData = ['售票量']
      }
      const legend = {
        data: legendData
      }
      return legend
    },

    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      const option = {
        grid: {
          top: 50,
          left: '3%',
          right: '4%',
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
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 12
            }
          },
          splitLine: {
            lineStyle: {
              color: '#EDF1F4'
            }
          }
        }],

        legend: this.initLegend(),

        xAxis: this.initXAxis(),

        series: this.initSeries()
      }

      this.chart.setOption(option)
    }
  }
}
</script>
