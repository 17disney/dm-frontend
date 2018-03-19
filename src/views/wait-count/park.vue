<style lang='stylus' scoped>
</style>
<template>
  <div class="app-container bg--gray">

    <div class="filter-container">

    <el-date-picker
      v-model="value6"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
      {{value6}}
      <!-- <el-date-picker value-format="yyyy-MM-dd" v-model="date" align="right" type="date" placeholder="选择日期"></el-date-picker> -->
    </div>
    <el-row :gutter="20">
      <el-col :span="12">

        <el-table size="small" stripe :data="parkList" v-loading.body="parkList.length === 0" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column label="日期" width="100">
            <template slot-scope="scope">
              {{scope.row.date}} {{scope.row.date | timeFormat('YYYY-MM-DD', 'd')}}
            </template>
          </el-table-column>
          <el-table-column filter-multiple label="售票量" width="70" align="type">
            <template slot-scope="scope">
              <span>{{scope.row.ticketNum}}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column filter-multiple label="平均客流" width="70" align="type">
            <template slot-scope="scope">
              <span>{{scope.row['flowAvg']}}</span>
            </template>
          </el-table-column> -->

          <el-table-column filter-multiple label="客流量" width="70" align="type">
            <template slot-scope="scope">
              <span>{{scope.row['flowMax']}}</span>
            </template>
          </el-table-column>

          <el-table-column filter-multiple label="客流预测" width="70" align="type">
            <template slot-scope="scope">
              <span>{{scope.row['flowFt']}}</span>
            </template>
          </el-table-column>

          <el-table-column filter-multiple label="乐园指数" width="70" align="type">
            <template slot-scope="scope">
              <span>{{scope.row['markAvg']}}</span>
            </template>
          </el-table-column>

          <el-table-column filter-multiple label="最高指数" width="70" align="type">
            <template slot-scope="scope">
              <span>{{scope.row['markMax']}}</span>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
      <el-col :span="12">
        <div class="panel">
          <div class="panel__heading">
            <h3 class="panel__title">售票量/客流量</h3>
          </div>
          <div class="panel__body">

            <el-checkbox-group v-model="indexList">
              <el-checkbox label="flowAvg">客流量</el-checkbox>
              <el-checkbox label="flowMax">最高客流量</el-checkbox>
              <el-checkbox label="ticketNum">售票量</el-checkbox>
            </el-checkbox-group>

            <line-area xAxisKey="date"  :indexList="indexList" legend="售票量/客流量" v-if="countLoad.parkList" :data="parkList" id="ticket-flow" height='100%' width='100%'></line-area>
            <el-button @click="clickMath" type="success">计算</el-button>
            {{ticketMath}}

            <line-area legend="售票量/客流量" v-if="isLoad.mathData" :data="ticketRegression" id="ticket-math" height='100%' width='100%'></line-area>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import lineArea from '@/components/Charts/lineArea'
import { mapActions, mapState } from 'vuex'
import PolynomialRegression from 'ml-regression-polynomial'

export default {
  components: { lineArea },

  props: {

  },

  data() {
    return {
      indexList: ['flowMax', 'ticketNum'],
      ticketMath: '',
      ticketRegression: [],
      isLoad: {
        mathData: false
      },
      search: {
        st: '2018-02-20',
        et: '2018-03-17'
      },
      value6: ''
    }
  },

  computed: {
    ...mapState({
      parkList: state => state.count.parkList,
      countLoad: state => state.count.isLoad
    })
  },

  mounted() {
    this.init()
  },

  methods: {
    ...mapActions([
      'getParkCountList',
      'getTicketList',
      'getTicketDate',
      'mathParkCount'
    ]),

    async init() {
      await this.getParkCountList()
      this.getTicketList()
    },

    clickMath() {
      const { parkList } = this

      const nData = []
      parkList.forEach(item => {
        if (item.date !== '2018-03-08') {
          nData.push(item)
        }
      })

      const y = nData.map(_ => _['flowMax'])
      const x = nData.map(_ => _['ticketNum'])

      const regression = new PolynomialRegression(x, y, 1)

      // 汇图
      const ticketMath = regression.coefficients
      this.ticketMath = ticketMath

      const ticketRegression = []
      for (let x = 0; x <= 20000; x = x + 100) {
        let y = 0
        let k = 0
        for (let s = 0; s < ticketMath.length; s++) {
          const _val = (ticketMath[k] * Math.pow(x, s))
          y += _val
          k++
        }
        ticketRegression.push({
          key: x,
          num: parseInt(y)
        })
      }
      this.mathParkCount(ticketMath)
      this.ticketRegression = ticketRegression
      this.isLoad.mathData = true
    }

  }
}
</script>
