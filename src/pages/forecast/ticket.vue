<template>
  <div class="page bg--gray">
    <div class="page-content">
      <el-card>
        <el-date-picker v-model="dateRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-card>
      <el-card>
        <el-table height="900" class="att-list-table" :data="data">
          <el-table-column label="日期" width="200">
            <template slot-scope="scope">
              <span>
                {{scope.row.date}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="节日因素" width="100">
            <template slot-scope="scope">
              <span>
                {{scope.row.dayRank}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="天气因素" width="100">
            <template slot-scope="scope">
              <span>
                {{scope.row.weaRank}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="大团队" width="100">
            <template slot-scope="scope">
              <span>
                {{scope.row.teamNum}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="售票量" width="100">
            <template slot-scope="scope">
              <span>
                {{scope.row.ticketNum}}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="售票趋势" width="200">
            <template slot-scope="scope">
              <span>
                <base-line v-if="scope.row.dayList" :data="scope.row.dayList" :id="scope.row.date"></base-line>
              </span>
            </template>
          </el-table-column>


          <el-table-column label="七天预报（精准度）">
            <template slot-scope="scope">
              <div class="forecast-num">
                <div class="forecast-num__item" v-for="(item, index) in scope.row.forecast">
                  <div class="forecast-num__day">前{{6 - index}}天</div>
                  <div class="forecast-num__num">{{item['ticketNumFT']}}</div>
                  <div class="forecast-num__mk"><forecast-item-rate :rate="item.rate"></forecast-item-rate></div>
                </div>
              </div>
              <!-- {{maths[scope.row.date]['flowRate']}} -->
              <!-- <el-progress :text-inside="true" :stroke-width="18" :percentage="maths[scope.row.date]['flowRate']"></el-progress> -->
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
// import { mapState } from 'vuex'
import moment from 'moment'
import BaseLine from '@/components/Charts/BaseLine'
import Forecast from '@/common/api/forecast'

import ForecastItemRate from '@/components/Forecast/ForecastItemRate'

const DATE_FORMAT = 'YYYY-MM-DD'

export default {
  mixins: [base],
  components: {
    BaseLine, ForecastItemRate
  },

  data() {
    return {
      dateRange: [moment().subtract(45, 'days').format(DATE_FORMAT), moment().add(-1, 'days').format(DATE_FORMAT)],
      data: []
    }
  },

  computed: {

  },

  async mounted() {
    await this.init()
  },

  methods: {
    async init() {
      const [st, et] = this.dateRange
      const { local } = this

      const ftData = await Forecast.forecastReport(local)

      console.log(ftData)

      const data = await Forecast.forecastTicket(local, st, et)
      this.data = data
    }
  }
}
</script>
