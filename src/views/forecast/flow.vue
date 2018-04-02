<style lang='stylus' scoped>
</style>
<template>
  <div class="page bg--gray">
    <div class="page-content">
      <el-card>
        <el-date-picker v-model="dateRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-card>

      <el-card>
        <el-table class="att-list-table" :data="parkCountList">
          <el-table-column label="日期">
            <template slot-scope="scope">
              <span>
                {{scope.row.date}}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="天气">
            <template slot-scope="scope">
              <span>
                {{scope.row.wea}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="气温">
            <template slot-scope="scope">
              <span>
                {{scope.row.temMin}} - {{scope.row.temMax}}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="售票量">
            <template slot-scope="scope">
              <span>
                {{tickets[scope.row.date]['saleCount']}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="等候指数">
            <template slot-scope="scope">
              <span>
                {{scope.row.markMax}}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="客流量">
            <template slot-scope="scope">
              <span>
                {{scope.row.flowMax}}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="预测客流">
            <template slot-scope="scope">
              <span>
                {{maths[scope.row.date]['flowFt']}}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="准确率">
            <template slot-scope="scope">
              <!-- {{maths[scope.row.date]['flowRate']}} -->
              <el-progress :text-inside="true" :stroke-width="18" :percentage="maths[scope.row.date]['flowRate']"></el-progress>

            </template>
          </el-table-column>

        </el-table>
      </el-card>

    </div>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import Ticket from '@/common/api/ticket'
import { mapState } from 'vuex'
import moment from 'moment'

const DATE_FORMAT = 'YYYY-MM-DD'

export default {
  mixins: [base],
  components: {

  },

  props: {
  },

  data() {
    return {
      dateRange: [moment().subtract(55, 'days').format(DATE_FORMAT), moment().add(10, 'days').format(DATE_FORMAT)],
      tickets: {},
      maths: {}
    }
  },

  computed: {
    ...mapState({
      parkCountList: state => state.wait.parkList
    })
  },

  async mounted() {
    await this.init()
    await this.getTicket()
  },

  methods: {
    async init() {
      const [st, et] = this.dateRange
      await this.getParkCountList({ st, et })
    },
    async getTicket() {
      const [st, et] = this.dateRange
      const data = await Ticket.available(this.local, { st, et })

      const tickets = {}
      data.forEach(item => {
        const { date, availableCount } = item
        item.saleCount = 20000 - availableCount
        tickets[date] = item
      })
      this.tickets = tickets

      const _temp = []
      const maths = {}
      this.parkCountList.forEach(item => {
        const { flowMax, markMax, date } = item
        const { saleCount } = tickets[date]

        let flowFt = 0

        if (saleCount < 10000) {
          flowFt += Math.round(saleCount * 5 + 14000)
        } else {
          flowFt += Math.round((saleCount - 10000) * 1 + 14000 + 80000)
        }

        let flowRate = 100 - Math.round(Math.abs(flowMax - flowFt) / flowMax * 100)
        if (flowRate < 0) flowRate = 0
        maths[date] = {
          flowFt,
          flowRate
        }
        _temp.push([saleCount, markMax, flowMax])
      })
      this.maths = maths
    }
  }
}
</script>
