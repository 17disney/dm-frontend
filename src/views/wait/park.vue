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
      </el-card>



      <!-- <el-row :gutter="20">
        <el-col :span="24">
          <el-card style="margin-bottom: 20px">
              <att-date-select :list="parkChartData" :data="parks"></att-date-select>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>客流量</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <line-area v-if="parkChartData" :data="parkChartData"></line-area>
          </el-card>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Waits from '@/common/api/waits'
import moment from 'moment'
import base from '@/common/mixins/base'

const DATE_FORMAT = 'YYYY-MM-DD'
export default {
  mixins: [base],
  components: {},

  data() {
    return {
      dateRang: moment().format(DATE_FORMAT),
      dateMode: 'today',
      park: {},
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
    // this.initDateList()
  },

  methods: {
    ...mapActions([
      'getParkCountList'
    ]),
    async init() {
      const { dateType, local, dateRang } = this
      if (dateType === 'date') {
        Waits.park(local, dateRang)
        this.park = await this.getPark()
      } else {
        this.getParkCount()
      }
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
