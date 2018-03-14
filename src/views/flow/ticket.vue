<style lang='stylus' scoped>
</style>
<template>
  <div class="app-container">

    <div class="filter-container">
      <el-date-picker value-format="yyyy-MM-dd" v-model="date" align="right" type="date" placeholder="选择日期">
      </el-date-picker>

    </div>


    <div class="panel">
      <div class="panel__heading">
        <h3 class="panel__title">售票趋势</h3>
      </div>
      <div class="panel__body">
        <line-area legend="售票量" v-if="isLoad.ticketDate" :data="ticketDate" :id="'ticket-' + date" height='100%' width='100%'></line-area>
      </div>
    </div>


  </div>
</template>

<script>
import Ticket from '@/api/ticket'
import moment from 'moment'
import lineArea from '@/components/Charts/lineArea'

export default {
  components: { lineArea },

  props: {
  },

  data() {
    return {
      local: 'shanghai',
      date: '2018-03-20',
      today: moment().format('YYYY-MM-DD'),
      isLoad: {
        ticketDate: false
      },
      ticketDate: []
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
  },

  methods: {
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
        }
        ticketTemp[date] = num
        // item[0] =
        // item[1] =
      })

      const ticketDate = []

      for (const date in ticketTemp) {
        const num = ticketTemp[date]
        ticketDate.push([date, num])
      }
      console.log(ticketDate)

      this.ticketDate = ticketDate
      this.isLoad.ticketDate = true
    }
  }
}
</script>
