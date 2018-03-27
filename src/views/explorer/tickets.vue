<style lang='stylus' scoped>
</style>
<template>
  <div class="page bg-gray">
    <div class="page-content">

      <el-card class="card-bottom">
        <att-count-date-select @click-date="clickDate"></att-count-date-select>
      </el-card>
      <el-card v-if="dateType==='date'">
        <charts-ticket-date v-if="ticketDate" :data="ticketDate"></charts-ticket-date>
      </el-card>

      <el-card v-if="dateType==='daterange'">
        <charts-ticket-count :data="ticketCount"></charts-ticket-count>
      </el-card>
    </div>

  </div>
</template>

<script>
import Ticket from '@/common/api/ticket'
import base from '@/common/mixins/base'
import moment from 'moment'
import ChartsTicketDate from '@/components/Charts/ChartsTicketDate'
import ChartsTicketCount from '@/components/Charts/ChartsTicketCount'
const DATE_FORMAT = 'YYYY-MM-DD'
export default {
  mixins: [base],
  components: { ChartsTicketDate, ChartsTicketCount },

  props: {
  },

  data() {
    return {
      dateRange: moment().format(DATE_FORMAT),
      ticketDate: {},
      ticketCount: []
    }
  },

  computed: {

    dateType() {
      const { dateRange } = this
      if (typeof dateRange === 'string') {
        return 'date'
      } else {
        return 'daterange'
      }
    }

  },

  mounted() {
    this.initDate()
  },

  methods: {
    async initDate() {
      const { local, dateRange } = this
      const data = await Ticket.availableDate(local, dateRange)
      this.ticketDate = data
    },
    async initCount() {
      const { local, dateRange } = this
      console.log(dateRange)
      const [st, et] = dateRange
      const data = await Ticket.available(local, { st, et })
      this.ticketCount = data
    },
    clickDate(val) {
      this.dateRange = val
      if (this.dateType === 'date') {
        this.initDate()
      } else {
        this.initCount()
      }
    }
  }
}
</script>
