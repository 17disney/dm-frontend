<style lang='stylus' scoped>
</style>
<template>
  <div class="app-container">

    <div class="filter-container">
      <el-date-picker value-format="yyyy-MM-dd" v-model="date" align="right" type="date" placeholder="选择日期"></el-date-picker>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-table @row-click="clickRow" v-if="parkData.length > 0" size="small" stripe :data="parkData" v-loading.body="parkData.length === 0" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column label="日期" width="100">
            <template slot-scope="scope">
              {{scope.row.date}} {{scope.row.date | timeFormat('YYYY-MM-DD', 'd')}}
            </template>
          </el-table-column>
          <el-table-column filter-multiple label="售票量" width="70" align="type">
            <template slot-scope="scope">
              <span>{{20000 - scope.row.availableCount}}</span>
            </template>
          </el-table-column>

          <el-table-column filter-multiple label="平均客流" width="70" align="type">
            <template slot-scope="scope">
              <span>{{scope.row['flowAvg']}}</span>
            </template>
          </el-table-column>

          <el-table-column filter-multiple label="最高客流" width="70" align="type">
            <template slot-scope="scope">
              <span>{{scope.row['flowMax']}}</span>
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
        <!-- <div class="panel">
          <div class="panel__heading">
            <h3 class="panel__title">售票趋势</h3>
          </div>
          <div class="panel__body">
            <line-area legend="售票量" v-if="isLoad.ticketDate" :data="ticketDate" :id="'ticket-' + date" height='100%' width='100%'></line-area>
            <line-area legend="售票量" v-if="isLoad.ticketRegression" :data="ticketRegression" id="ticketRegression" height='100%' width='100%'></line-area>
            <div>
              <p>{{ticketMath}}</p>
              <el-button type="primary" @click="clickUpdateRegression">主要按钮</el-button>
            </div>
          </div>
        </div> -->

        <div class="panel">
          <div class="panel__heading">
            <h3 class="panel__title">售票量/客流量</h3>
          </div>
          <div class="panel__body">
            <el-checkbox-group @change="selectIndex" v-model="indexList">
              <el-checkbox label="flowAvg">客流量</el-checkbox>
              <el-checkbox label="flowMax">最高客流量</el-checkbox>
              <el-checkbox label="ticketNum">售票量</el-checkbox>
            </el-checkbox-group>
            <line-area legend="售票量/客流量"  :data="parkChartData" id="ticket-flow" height='100%' width='100%'></line-area>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Ticket from '@/api/ticket'
import Waits from '@/api/waits'
import Forecast from '@/api/forecast'
import moment from 'moment'
import lineArea from '@/components/Charts/lineArea'
// import { PolynomialRegression, SLR } from 'ml-regression'
// import ExponentialRegression from 'ml-regression-exponential'
// const PolynomialRegression = require('ml-regression').PolynomialRegression;
import PolynomialRegression from 'ml-regression-polynomial'
import { Message } from 'element-ui'

export default {
  components: { lineArea },

  props: {
  },

  data() {
    return {
      local: 'shanghai',
      date: '2018-03-15',
      today: moment().format('YYYY-MM-DD'),
      isLoad: {
        ticketDate: false,
        ticketCount: false,
        parkCount: false,
        ticketRegression: false,
        ticketFlowCount: false
      },
      ticketCount: [],
      ticketDate: [],
      parkCount: {},
      coefficients: '',
      ticketRegression: [],
      ticketMath: '',
      ticketFlowCount: [],
      parkData: [],
      indexList: [],
      parkChartData: []

    }
  },
  watch: {
    'date': function(val) {
      this.init()
    }
  },
  computed: {

  },

  mounted() {
    this.init()
    this.initList()

    // const x = [50, 50, 50, 70, 70, 70, 80, 80, 80, 90, 90, 90, 100, 100, 100]
    // const y = [3.3, 2.8, 2.9, 2.3, 2.6, 2.1, 2.5, 2.9, 2.4, 3.0, 3.1, 2.8, 3.3, 3.5, 3.0]
  },

  methods: {
    async clickUpdateRegression() {
      const { local, date } = this
      const update = {
        ticketMath: this.ticketMath
      }
      const data = await Forecast.updatePark(local, date, update)
      if (data) {
        Message({
          message: '更新成功',
          type: 'success'
        })
      }
    },
    async clickRow(e) {
      const { date } = e
      const { local } = this
      this.date = date

      const data = await Waits.park(local, date)
      console.log(data)
    },
    regression(data) {
      if (data.length < 15) {
        return
      }

      const x = []
      for (let i = 0; i < data.length; i++) {
        x.push(i)
      }
      const y = data.map(_ => _[1])
      // console.log(x)
      // console.log(y)

      const regression = new PolynomialRegression(x, y, 8)

      // 汇图
      const coefficients = regression.coefficients
      this.ticketMath = coefficients
      const ticketRegression = []
      for (let x = 0; x <= 14; x++) {
        let y = 0
        let k = 0
        for (let s = 0; s < coefficients.length; s++) {
          const _val = (coefficients[k] * Math.pow(x, s))
          y += _val
          k++
        }
        ticketRegression.push([x, y])
      }

      this.isLoad.ticketRegression = true
      this.ticketRegression = ticketRegression
    },

    async getParkTicket() {
      const { local } = this
      const arg = {
        st: '2018-03-02',
        et: '2018-04-15'
      }

      const parkData = await Waits.waitCountPark(local, arg)
      const ticketData = await Ticket.available(local, arg)

      const ticketDates = {}
      ticketData.forEach(item => {
        const { date } = item
        ticketDates[date] = item
      })

      parkData.forEach(item => {
        const { date } = item
        if (ticketDates[date]) {
          Object.assign(item, ticketDates[date])
        }
      })

      this.parkData = parkData
    },
    selectIndex() {
      const { deepClone } = this.Utils
      const { indexList, parkData } = this

      const _parkData = deepClone(parkData)
      const series = []
      _parkData.forEach(item => {
        const _arr = []
        _arr[0] = item.date
        indexList.forEach(index => {
          if (index === 'availableCount') {
            item[index] = 20000 - item[index]
          }
          _arr.push(item[index])
        })
        series.push(_arr)
      })

      this.parkChartData = series
    },

    async initList() {
      await this.getParkTicket()

      // this.ticketCount = ticketData
      // this.isLoad.parkCount = true

      // // 处理售票量/客流量
      // const ticketFlowCount = {}
      // let _data = []
      // parkData.forEach(item => {
      //   _data.push([
      //     item.date,
      //     item.flowAvg
      //   ])
      // })
      // _data.reverse()

      // ticketFlowCount['park'] = _data

      // _data = []
      // parkData.forEach(item => {
      //   _data.push([
      //     item.date,
      //     item.availableCount
      //   ])
      // })
      // _data.reverse()

      // console.log(_data)

      // ticketFlowCount['ticket'] = _data
      // this.ticketFlowCount = ticketFlowCount
      // this.isLoad.ticketFlowCount = true
    },

    async init() {
      const { local, date } = this
      let data = await Ticket.availableDate(local, date)

      data = data.availableList
      // const dataDate = data.date

      const startX = moment(date, 'YYYY-MM-DD').format('x') - 86400000 * 14
      const ticketData = []

      const dataEndNum = data[data.length - 1][1]

      const dayNum = moment(date).diff(moment(), 'days')

      if (dayNum > 0) {
        for (let i = 1; i <= dayNum; i++) {
          console.log(moment().add(i, 'days').format('YYYY-MM-DD'))
          data.push([
            moment().add(i, 'days').format('x'),
            dataEndNum
          ])
        }
      }
      const ticketTemp = {}
      data.forEach(item => {
        let [date, num] = item
        const datetime = moment(date, 'x').format('M/DD HH:mm')
        date = moment(date, 'x').format('M/DD')
        num = 20000 - num
        if (item[0] > startX) {
          ticketData.push([
            datetime,
            num
          ])
          ticketTemp[date] = num
        }
        // item[0] =
        // item[1] =
      })

      const ticketDate = []

      for (const date in ticketTemp) {
        const num = ticketTemp[date]
        ticketDate.push([date, num])
      }
      this.regression(ticketDate)

      this.ticketDate = ticketDate
      this.isLoad.ticketDate = true
    }
  }
}
</script>
