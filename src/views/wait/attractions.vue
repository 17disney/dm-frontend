<style lang="stylus" scoped>
.att-date-select {
  margin-bottom: 20px;
}
</style>

<template>
  <div class="page bg--gray">
    <div class="page-content">
      <div class="card">
        <div class="card__body">
          <div class="att-list-form">
            <att-date-select @select-date="clickDate" v-model="date"></att-date-select>
          </div>
          <el-table class="att-list-table" :data="activeAttList" v-loading.body="attLoading.attsWait">
            <el-table-column label="名称">
              <template slot-scope="scope">
                <div class="att-list-item__meta">
                  <att-media size="small" :medias="scope.row.medias" type="finderListMobileSquare"></att-media>
                  <span class="title">
                    {{scope.row.name}}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="150">
              <template slot-scope="scope">
                <att-status v-if="attsWait[scope.row.aid]" :status="attsWait[scope.row.aid]['status']"></att-status>
              </template>
            </el-table-column>
            <el-table-column label="平均等候" width="150">
              <template slot-scope="scope">
                <att-wait-time v-if="attsWait[scope.row.aid]" :wait="attsWait[scope.row.aid]" :time="attsWait[scope.row.aid]['waitAvg']"></att-wait-time>
              </template>
            </el-table-column>
            <el-table-column label="趋势" width="250">
              <template slot-scope="scope">
                <base-line v-if="attsWait[scope.row.aid]" :data="attsWait[scope.row.aid]['waitHour']" :id="scope.row.aid"></base-line>
              </template>
            </el-table-column>
            <el-table-column label="乘坐人数" width="250">
              <template slot-scope="scope">
                <att-count-number v-if="attsWait[scope.row.aid] && attNumber[scope.row.aid]" :data="scope.row" :wait="attsWait[scope.row.aid]" :number="attNumber[scope.row.aid]"></att-count-number>
              </template>
            </el-table-column>
            <!-- <el-table-column label="最高等候" width="150">
              <template slot-scope="scope">
                <att-wait-time v-if="attsWait[scope.row.aid]" :time="attsWait[scope.row.aid]['waitMax']"></att-wait-time>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import BaseLine from '@/components/Charts/BaseLine'
import Waits from '@/common/api/waits'

export default {
  components: { BaseLine },

  data() {
    return {
      date: moment().format('YYYY-MM-DD'),
      attNumber: {},
      filters: {
        hotLevel: 3,
        type: 'attraction'
      }
    }
  },

  computed: {
    ...mapState({
      local: state => state.explorer.local,
      attsWait: state => state.wait.attsWait,
      attType: state => state.explorer.attType,
      playType: state => state.explorer.playType,
      attLoading: state => state.wait.loading
    }),
    ...mapGetters([
      'attListFilter',
      'attractionList'
    ]),
    activeAttList() {
      const { type, hotLevel } = this.filters
      return this.attListFilter(type, hotLevel)
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    ...mapActions([
      'getDestinationsList',
      'getDestinationsRawList',
      'getAttractionsWait',
      'getSchedules'
    ]),
    initAttListNumber(data) {
      data.forEach(item => {
        this.mathAttNumber(item)
      })
    },
    clickDate(date) {
      this.date = date
      this.getAttractionsWait(this.date)
    },

    async mathAttNumber(row) {
      const { aid, runDefault } = row
      const { local, date } = this
      const data = await Waits.attractionsId(local, date, aid)
      const { waitList } = data

      let number = 0
      for (let i = 0; i < waitList.length; i++) {
        const [time, wait] = waitList[i]
        if (wait > 0) {
          const [bTime, bWait] = waitList[i - 1]
          let _runDefault = runDefault
          if (bWait === 5) {
            _runDefault = runDefault * 0.5
          }
          if (bWait === 10) {
            _runDefault = runDefault * 0.7
          }
          const _num = (time - bTime) / 60000 * _runDefault
          number += _num
        }
      }
      this.attNumber[aid] = Math.round(number)
    },

    async init() {
      this.getDestinationsList()
      this.getAttractionsWait(this.date)
    }
  }
}
</script>
