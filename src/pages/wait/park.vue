<style lang='stylus' scoped>
</style>
<template>
  <div class="page bg--gray">
    <div class="page-content">
      <el-card class="card-bottom">
        <el-radio-group v-model="dateMode">
          <el-radio-button label="today">今天</el-radio-button>
          <el-radio-button label="yestday">昨天</el-radio-button>
          <el-radio-button label="7d">最近7天</el-radio-button>
          <el-radio-button label="30d">最近30天</el-radio-button>
        </el-radio-group>
        <el-date-picker v-model="dateRang" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :type="dateType" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <att-date-select @select-date="clickDate" style="margin-top:16px;" v-model="dateRang"></att-date-select>
      </el-card>
      <!-- <el-card class="card-bottom" v-if="dateType==='date'">
        <div class="att-count-num">
          <ul class="att-count-num__list">
            <li class="att-count-num__item">
              {{parkWait.flowMax}}
            </li>
          </ul>
        </div>
      </el-card> -->
      <el-row :gutter="16" v-if="dateType==='date'">
        <el-col :span="12">
          <el-card class="card-bottom">
            <div slot="header" class="clearfix">
              <span>客流量</span>
            </div>
            <charts-park-wait id="chart-park-flow" type="flow" :data="parkWait"></charts-park-wait>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>乐园指数</span>
            </div>
            <charts-park-wait id="chart-park-mark" type="mark" :data="parkWait"></charts-park-wait>
          </el-card>
        </el-col>
      </el-row>

      <el-card class="card-bottom" v-if="dateType==='daterange'">
        <div slot="header" class="clearfix">
          <span>乐园客流量</span>
        </div>
        <charts-park-count id="charts-park-count-flow" :indexList="['flowMax']" :data="parkCount"></charts-park-count>
      </el-card>

      <el-card v-if="dateType==='daterange'">
        <div slot="header" class="clearfix">
          <span>乐园指数</span>
        </div>
        <charts-park-count id="charts-park-count-mark" :indexList="['markMax']" :data="parkCount"></charts-park-count>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'
import base from '@/common/mixins/base'
import ChartsParkWait from '@/components/Charts/ChartsParkWait'
import ChartsParkCount from '@/components/Charts/ChartsParkCount'

const DATE_FORMAT = 'YYYY-MM-DD'
export default {
  mixins: [base],
  components: { ChartsParkWait, ChartsParkCount },

  data() {
    return {
      dateRang: moment().format(DATE_FORMAT),
      dateMode: 'today',
      parkWait: {},
      parkCount: []
    }
  },

  computed: {
    ...mapState({
      parkList: state => state.wait.parkList,
      parks: state => state.wait.parks
    }),
    ...mapGetters([
      'parkTargetList'
    ]),

    dateType() {
      const { dateRang } = this
      if (typeof dateRang === 'string') {
        return 'date'
      } else {
        return 'daterange'
      }
    }
  },
  watch: {
    'dateMode'(val) {
      if (val === 'today') {
        this.dateRang = moment().format(DATE_FORMAT)
      } else if (val === 'yestday') {
        this.dateRang = moment().subtract(1, 'days').format(DATE_FORMAT)
      } else if (val === '7d') {
        const st = moment().subtract(7, 'days').format(DATE_FORMAT)
        const et = moment().subtract(0, 'days').format(DATE_FORMAT)
        this.dateRang = [st, et]
      } else if (val === '30d') {
        const st = moment().subtract(30, 'days').format(DATE_FORMAT)
        const et = moment().subtract(0, 'days').format(DATE_FORMAT)
        this.dateRang = [st, et]
      }
    },
    'dateRang'(val) {
      this.init()
    }
  },
  mounted() {
    this.init()
  },

  methods: {
    async init() {
      const { dateType, local, dateRang } = this
      if (dateType === 'date') {
        this.parkWait = await this.$Api.waitTimes.park(local, dateRang)
      } else {
        const [st, et] = this.dateRang
        const parkCount = await this.$Api.waitTimes.parkCount(local, { st, et })
        this.parkCount = parkCount.reverse()
      }
    },
    clickDate(date) {
      this.dateRang = date
    },

    initDateList() {
      const { st, dateList } = this
      for (let i = 0; i < 7; i++) {
        dateList.push(moment(st, 'YYYY-MM-DD').add(i, 'd').format('YYYY-MM-DD'))
      }
    }
  }
}
</script>
