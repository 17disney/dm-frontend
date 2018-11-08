<style lang='stylus' scoped>
</style>
<template>
  <div class="page bg--gray">
    <div class="page-content">
      <el-card>
        <el-date-picker v-model="dateRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-card>

      <el-card>
        <el-table class="att-list-table" :data="data">
          <el-table-column label="日期">
            <template slot-scope="scope">
              <span>
                {{scope.row.date}}
              </span>
            </template>
          </el-table-column>

          <!-- <el-table-column label="天气">
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
          </el-table-column> -->
          <el-table-column label="售票量">
            <template slot-scope="scope">
              <span>
                {{scope.row.ticketNum}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="欢乐度">
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
                {{scope.row.flowMaxFT}}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="准确率">
            <template slot-scope="scope">
              <span>
                <!-- <forecast-item-rate :rate="scope.row.flowMaxFTRate"></forecast-item-rate> -->
                <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.flowMaxFTRate"></el-progress>
              </span>
            </template>
          </el-table-column>

        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import { mapState } from 'vuex'
import moment from 'moment'
import Forecast from 'packages/17disney-common/api/forecast'
import ForecastItemRate from '@/components/Forecast/ForecastItemRate'

const DATE_FORMAT = 'YYYY-MM-DD'

export default {
  mixins: [base],
  components: {
    ForecastItemRate
  },

  data() {
    return {
      dateRange: [moment().subtract(15, 'days').format(DATE_FORMAT), moment().add(-1, 'days').format(DATE_FORMAT)],
      data: []
    }
  },

  computed: {
    ...mapState({
      parkCountList: state => state.wait.parkList
    })
  },

  async mounted() {
    await this.init()
  },

  methods: {
    async init() {
      const [st, et] = this.dateRange
      const { local } = this

      this.data = await Forecast.forecastPark(local, st, et)
    }
  }
}
</script>
