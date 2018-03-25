<style lang='stylus' scoped>
</style>
<template>
  <div class="page bg--gray">
    <div class="page-content">
      <!-- {{parkList}} -->
      <el-row :gutter="20">

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
      </el-row>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import LineArea from '@/components/Charts/LineArea'
export default {
  components: { LineArea },

  data() {
    return {
      st: moment().startOf('week').format('YYYY-MM-DD'),
      et: moment().format('YYYY-MM-DD'),
      date: moment().format('YYYY-MM-DD'),
      dateList: []
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
    parkChartData: function() {
      const data = []
      const { parkList, dateList } = this

      for (let i = 0; i < dateList.length; i++) {
        const item = parkList[i] || {}
        const date = dateList[i]
        data.push({
          key: date,
          num: item['flowMax']
        })
      }
      return data
    }
  },

  mounted() {
    const { st, et } = this
    const arg = { st, et }
    this.getParkCountList(arg)
    this.initDateList()
  },

  methods: {
    ...mapActions([
      'getParkCountList'
    ]),
    initDateList() {
      const { st, dateList } = this
      for (let i = 0; i < 7; i++) {
        dateList.push(moment(st, 'YYYY-MM-DD').add(i, 'd').format('YYYY-MM-DD'))
      }
    }
  }
}
</script>
