<template>
  <div class="page bg--gray">
    <div class="page-content">
      <el-card>
        <el-date-picker v-model="dateRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-card>
      <el-card>
        <el-table height="900" class="att-list-table" :data="data">
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">
              <span>
                {{scope.row.date}}
              </span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="节日因素" width="100">
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
          </el-table-column> -->
          <!-- <el-table-column label="大团队" width="100">
            <template slot-scope="scope">
              <span>
                {{scope.row.teamNum}}
              </span>
            </template>
          </el-table-column> -->
          <el-table-column label="当前售票量" width="100">
            <template slot-scope="scope">
              <span>
                {{scope.row.ticketNum}}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="预测售票量" width="100">
            <template slot-scope="scope">
              <span>
                {{scope.row.ticketNumFT}}
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

          <el-table-column label="预测客流量" width="100">
            <template slot-scope="scope">
              <span>
                {{scope.row.flowMaxFT}}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="等候时间预测">
            <template slot-scope="scope">
              <span>
              <div class="forecast-num">
                <div class="forecast-num__item" v-for="(item, index) in activeAttList">
                  <div class="forecast-num__day">{{item.name}}</div>
                  <div class="forecast-num__num">{{scope.row.atts[item.aid]['waitAvg']}}分钟</div>
                </div>
              </div>
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
// import moment from 'moment'
import BaseLine from '@/components/Charts/BaseLine'
import Forecast from 'pkg/17disney-common/api/forecast'
import { mapGetters } from 'vuex'

import ForecastItemRate from '@/components/Forecast/ForecastItemRate'

// const DATE_FORMAT = 'YYYY-MM-DD'

export default {
  mixins: [base],
  components: {
    BaseLine, ForecastItemRate
  },

  data() {
    return {
      data: []
    }
  },

  computed: {
    ...mapGetters([
      'attListFilter',
      'attractionList'
    ]),

    activeAttList() {
      return this.attListFilter('attraction', 5)
    }

  },

  async mounted() {
    await this.init()
  },

  methods: {
    async init() {
      const { local } = this
      const data = await Forecast.forecastReport(local)

      data.forEach(item => {
        const { attractions } = item
        const atts = {}
        attractions.forEach(_ => {
          atts[_.id] = _
        })
        item.atts = atts
      })
      this.data = data
    }
  }
}
</script>
