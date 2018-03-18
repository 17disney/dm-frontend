<style lang='stylus' scoped>
</style>
<template>
  <div class="app-container bg--gray">

    <div class="filter-container">
      <!-- <el-date-picker value-format="yyyy-MM-dd" v-model="date" align="right" type="date" placeholder="选择日期"></el-date-picker> -->
    </div>
    <el-row :gutter="20">
      <el-col :span="12">

        <el-table v-if="isLoad.parkCount" size="small" stripe :data="parkCount" v-loading.body="!isLoad.parkCount" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column label="日期" width="100">
            <template slot-scope="scope">
              {{scope.row.date}} {{scope.row.date | moment('YYYY-MM-DD', 'd')}}
            </template>
          </el-table-column>
          <!-- <el-table-column filter-multiple label="售票量" width="70" align="type">
            <template slot-scope="scope">
              <span>{{20000 - scope.row.availableCount}}</span>
            </template>
          </el-table-column> -->

          <el-table-column filter-multiple label="平均客流" width="70" align="type">
            <template slot-scope="scope">
              <span>{{scope.row['flowAvg']}}</span>
            </template>
          </el-table-column>

          <el-table-column filter-multiple label="最高客流" width="70" align="type">
            <template slot-scope="scope">
              <span>{{scope.row['flowMax']}}</span>
            </template>
          </el-table-column>

          <el-table-column filter-multiple label="乐园指数" width="70" align="type">
            <template slot-scope="scope">
              <span>{{scope.row['markAvg']}}</span>
            </template>
          </el-table-column>

          <el-table-column filter-multiple label="最高指数" width="70" align="type">
            <template slot-scope="scope">
              <span>{{scope.row['markMax']}}</span>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
      <el-col :span="12">
        <div class="panel">
          <div class="panel__heading">
            <h3 class="panel__title">售票量/客流量</h3>
          </div>
          <div class="panel__body">
            <line-area legend="售票量/客流量" v-if="isLoad.ticketFlowCount" :data="ticketFlowCount" id="ticket-flow" height='100%' width='100%'></line-area>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import lineArea from '@/components/Charts/lineArea'
import Waits from '@/api/waits'

export default {
  components: { lineArea },

  props: {
  },

  data() {
    return {
      isLoad: {
        parkCount: false,
        ticketFlowCount: false
      },
      parkCount: [],
      ticketFlowCount: [],
      local: 'shanghai'
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {

    async init() {
      const { local } = this
      const arg = {
        st: '2017-04-20',
        et: '2018-03-17'
      }
      const parkData = await Waits.waitCountPark(local, arg)
      this.parkCount = parkData
      this.isLoad.parkCount = true

      const _data = []
      parkData.forEach(item => {
        _data.push([
          item.date,
          item.flowAvg
        ])
      })
      console.log(_data)
      this.ticketFlowCount = _data
      this.isLoad.ticketFlowCount = true
      // const parkCount = {}
      // parkData.forEach(item => {
      //   const { date } = item
      //   thisparkCount[date] = item
      // })
    }

  }
}
</script>
