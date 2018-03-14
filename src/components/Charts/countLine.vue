<style lang="stylus">
.chart-count-base {
  height: 200px;

  .inner {
    height: 100%;
    width: 100%;
  }
}
</style>

<template>
  <div class="chart-count-base">
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
      let { data } = this
      data = data.reverse()
      // let data = this

      // data.forEach(_ => {

      // })
      this.chart = echarts.init(document.getElementById(this.id))
      // const timeList = this.data.map(_ => _[0])

      this.chart.setOption({
        // backgroundColor: '#394056',
        title: {
          top: 20
          // text: 'Requests',
          // textStyle: {
          //   fontWeight: 'normal',
          //   fontSize: 16,
          //   color: '#F1F1F3'
          // },
          // left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['等候时间'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          top: 100,
          left: '3%',
          right: '4%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: data.map(_ => _['date'])
        }],
        yAxis: [{
          type: 'value',
          name: '(分钟)',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [{
          name: '等候时间',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
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
                color: 'rgba(137, 189, 27, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(137, 189, 27, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(137,189,27)',
              borderColor: 'rgba(137,189,2,0.27)',
              borderWidth: 12

            }
          },
          data: data.map(_ => _['waitAvg'])
        }]
      })
    }
  }
}
</script>
