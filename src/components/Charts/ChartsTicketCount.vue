<template>
  <div class="chart chart--att-count chart--full">
    <div :id="id" class="inner"/>
  </div>
</template>

<script>
import echarts from 'echarts'
import Color from '@/common/color'

export default {
  props: {
    id: {
      type: String,
      default: 'charts-ticket-count'
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      chart: null,
      indexList: ['availableCount']
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
    initSeries(data, key) {
      const name = this.Filters.fieldName(key)
      const series = {
        name,
        data,
        type: 'bar',
        smooth: true,
        symbolSize: 2,
        showSymbol: false,
        barWidth: '40%',

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
      const { data, legend, indexList } = this

      // 设置x轴数据
      const xAxisData = data.map(_ => _['date'])
      const series = []
      indexList.forEach(item => {
        const _data = data.map(_ => 20000 - _[item])
        const _series = this.initSeries(_data, item)
        series.push(_series)
      })

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
            lte: 5000,
            color: Color.colorPrimary
          }, {
            gt: 5000,
            lte: 20000,
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
          data: [legend]
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
