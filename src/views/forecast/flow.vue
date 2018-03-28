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
              <div class="att-list-item__meta">
                <span>
                  {{scope.row.date}}
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="天气">
            <template slot-scope="scope">
              <div class="att-list-item__meta">
                <span>
                  {{scope.row.wea}}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="气温">
            <template slot-scope="scope">
              <div class="att-list-item__meta">
                <span>
                  {{scope.row.temMin}} - {{scope.row.temMax}}
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="售票量">
            <template slot-scope="scope">
              <div class="att-list-item__meta">
                <span>
                  {{tickets[scope.row.date]['saleCount']}}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="等候指数">
            <template slot-scope="scope">
              <div class="att-list-item__meta">
                <span>
                  {{scope.row.markMax}}
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="客流量">
            <template slot-scope="scope">
              <div class="att-list-item__meta">
                <span>
                  {{scope.row.flowMax}}
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="预测客流">
            <template slot-scope="scope">
              <div class="att-list-item__meta">
                <span>
                   {{maths[scope.row.date]['flowFt']}}
                </span>
              </div>
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
      dateRange: [moment().subtract(30, 'days').format(DATE_FORMAT), moment().format(DATE_FORMAT)],
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

        maths[date] = {
          flowFt: Math.round(saleCount * 8.6 + 14000)
        }
        _temp.push([saleCount, markMax, flowMax])
      })
      this.maths = maths
    }
  }
}
</script>
