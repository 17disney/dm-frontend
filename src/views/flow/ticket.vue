<style lang='stylus' scoped>
</style>
<template>
  <div class="app-container">

    <div class="filter-container">
      <el-date-picker value-format="yyyy-MM-dd" v-model="date" align="right" type="date" placeholder="选择日期"></el-date-picker>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-table @row-click="clickRow" v-if="ticketCount" size="small" stripe :data="ticketCount" v-loading.body="isLoad.ticketCount" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column label="日期" width="200">
            <template slot-scope="scope">
              {{scope.row.date}} {{scope.row.date | moment('YYYY-MM-DD', 'd')}}
            </template>
          </el-table-column>
          <el-table-column filter-multiple label="售票量" width="100" align="type">
            <template slot-scope="scope">
              <span>{{20000 - scope.row.availableCount}}</span>
            </template>
          </el-table-column>

          <el-table-column filter-multiple label="平均客流量" width="100" align="type">
            <template slot-scope="scope">
              <span>{{scope.row['flowAvg']}}</span>
            </template>
          </el-table-column>

          <el-table-column filter-multiple label="最高客流量" width="100" align="type">
            <template slot-scope="scope">
              <span>{{scope.row['flowMax']}}</span>
            </template>
          </el-table-column>

          <el-table-column filter-multiple label="乐园指数" width="100" align="type">
            <template slot-scope="scope">
              <span>{{scope.row['markAvg']}}</span>
            </template>
          </el-table-column>

          <el-table-column filter-multiple label="最高指数" width="100" align="type">
            <template slot-scope="scope">
              <span>{{scope.row['markMax']}}</span>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
      <el-col :span="12">
        <div class="panel">
          <div class="panel__heading">
            <h3 class="panel__title">售票趋势</h3>
          </div>
          <div class="panel__body">
            <line-area legend="售票量" v-if="isLoad.ticketDate" :data="ticketDate" :id="'ticket-' + date" height='100%' width='100%'></line-area>
            <div>{{coefficients}}</div>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Ticket from '@/api/ticket'
import Waits from '@/api/waits'
import moment from 'moment'
import lineArea from '@/components/Charts/lineArea'
// import { PolynomialRegression, SLR } from 'ml-regression'
// import ExponentialRegression from 'ml-regression-exponential'
// const PolynomialRegression = require('ml-regression').PolynomialRegression;
import PolynomialRegression from 'ml-regression-polynomial'

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
        parkCount: false
      },
      ticketCount: [],
      ticketDate: [],
      parkCount: {},
      coefficients: ''
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
    async clickRow(e) {
      const { date } = e
      const { local } = this
      this.date = date

      const data = await Waits.park(local, date)
      console.log(data)
    },
    regression(data) {
      const { date } = this
      let x = data.map(_ => {
        const _date = _[0]
        return Math.abs(moment(_date, 'MM/DD').diff(moment(date), 'days') - 1)
      })

      x = x.reverse()

      const y = data.map(_ => _[1])

      console.log(x)
      console.log(y)

      const degree = 3 // setup the maximum degree of the polynomial

      const regression = new PolynomialRegression(x, y, degree)

      console.log(regression.coefficients) // Prints the coefficients in increasing order of power (from 0 to degree).

      const coefficients = regression.coefficients
      // console.log(coefficients.reverse())

      for (let x = 1; x <= 15; x++) {
        let y = 0
        let k = 0
        for (let s = 0; s < coefficients.length; s++) {
          const _val = (coefficients[k] * Math.pow(x, s))
          // console.log(_val)
          y += _val
          k++
        }
        console.log(y)
      }

      // console.log(regression)

      // const degree = 10 // setup the maximum degree of the polynomial
      // const regression = new PolynomialRegression(x, y, degree)
      // // console.log(regression.predict(80)) // Apply the model to some x value. Prints 2.6.
      // console.log(regression.coefficients) // Prints the coefficients in increasing order of power (from 0 to degree).
      console.log(regression.toString()) // Prints a human-readable version of the function.
      // console.log(regression.toLaTeY())

      // this.coefficients = regression.toString()
    },

    async initList() {
      const { local } = this
      const arg = {
        st: '2018-02-21',
        et: '2018-04-15'
      }

      const ticketData = await Ticket.available(local, arg)

      const parkData = await Waits.waitCountPark(local, arg)
      const parkCount = {}
      parkData.forEach(item => {
        const { date } = item
        parkCount[date] = item
      })

      ticketData.forEach(item => {
        const { date } = item
        if (parkCount[date]) {
          Object.assign(item, parkCount[date])
        }
      })

      this.ticketCount = ticketData
      this.isLoad.parkCount = true
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
