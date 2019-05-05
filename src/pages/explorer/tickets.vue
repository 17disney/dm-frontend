<template>
  <div class="page bg-gray">
    <dm-header>
      <att-count-date-select @click-date="clickDate"/>
    </dm-header>
    <dm-main>
      <dm-content>
        <el-card v-if="dateType==='date'">
          <charts-ticket-date v-if="ticketDate" :data="ticketDate"/>
        </el-card>
        <el-card v-else>
          <charts-ticket-count :data="ticketCount"/>
        </el-card>
      </dm-content>
    </dm-main>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import moment from 'moment'
import ChartsTicketDate from '@/components/Charts/ChartsTicketDate'
import ChartsTicketCount from '@/components/Charts/ChartsTicketCount'
import AttCountDateSelect from '@/components/Att/AttCountDateSelect'

const DATE_FORMAT = 'YYYY-MM-DD'
export default {
  components: { ChartsTicketDate, ChartsTicketCount, AttCountDateSelect },
  mixins: [base],

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
    setTimeout(() => {
      this.initDate()
    }, 1000)
  },

  methods: {
    async initDate() {
      const { local, dateRange } = this
      const data = await this.$Api.waitTimes.ticketAvailableDate(local, dateRange)
      this.ticketDate = data
    },

    async initCount() {
      const { local, dateRange } = this
      console.log(dateRange)
      const [st, et] = dateRange
      const data = await this.$Api.waitTimes.ticketAvailable(local, { st, et })
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
