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
      default: 'chart-att-fp'
    },
    data: {
      type: Object
    },
    att: Object
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
      const { startTime, endTime, date } = data
      let { fpList = [] } = data
      fpList = fpList.filter(item => item[0] >= moment(date + ' ' + startTime, 'YYYY-MM-DD HH:mm:ss').format('x') && item[0] <= moment(date + ' ' + endTime, 'YYYY-MM-DD HH:mm:ss').format('x'))

      // 设置x轴数据
      const xAxisData = fpList.map(_ => moment(_[0], 'x').format('HH:mm'))

      const series = []
      const endX = moment(date + ' ' + endTime, 'YYYY-MM-DD HH:mm:ss').format('X')
      const { runDefault } = this.att
      const waitNumList = fpList.map(_ => {
        const fp = _[1]
        let fpX = 0
        if (fp !== 'FASTPASS is Not Available') {
          fpX = endX - moment(date + ' ' + _[1], 'YYYY-MM-DD HH:mm:ss').format('X')
          fpX = fpX * runDefault / 200
        }
        return fpX
      })

      const _series = this.initSeries('快速通行证剩余', waitNumList)
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
