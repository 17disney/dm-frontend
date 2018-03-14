<template>
  <div class="chart chart--full">
    <div class="inner" :id="id"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

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
    },
    legend: {
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

    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const { data, legend } = this

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

        legend: {
          data: [legend]
        },

        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#5C6B80'
            }
          },
          data: data.map(_ => _[0])
        }],

        series: [{
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
          data: data.map(_ => _[1])
        }]
      }

      this.chart.setOption(option)
    }
  }
}
</script>
