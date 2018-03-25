<template>
  <div class="page bg--gray">

    <div class="page-content">
      <div class="card">
        <div class="card__body">
          <div class="att-list-form">
            <att-date-select @select-date="clickDate" v-model="date"></att-date-select>

          </div>

          <el-table class="att-list-table" :data="activeAttList" v-loading.body="attLoading.attsWait">
            <!-- <el-table-column type="expand">
              <template slot-scope="scope">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="WebLink">
                    <span>{{ scope.row.webLink }}</span>
                  </el-form-item>
                  <el-form-item label="介绍">
                    <span v-for="desc in scope.row.descriptions">{{ desc.text}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column> -->
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
                <!-- <att-status v-if="attsWait[scope.row.aid]" :status="attsWait[scope.row.aid]['status']"></att-status> -->
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
          <!-- <att-list :data="attractionList"></att-list> -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import Chart from '@/components/Charts/lineMarker'
import BaseLine from '@/components/Charts/BaseLine'
import Waits from '@/common/api/waits'

export default {
  components: { Chart, BaseLine },

  data() {
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },

      listLoading: false,
      date: '2018-03-24', // moment().format('YYYY-MM-DD'),
      waits: {},
      attNumber: {},
      filters: {
        hotLevel: 3,
        type: 'attraction',
        date: moment().format('YYYY-MM-DD')
      }
    }
  },

  watch: {
    // 'filters.date': function (val) {
    //   this.getWaits()
    // }
  },
  computed: {
    ...mapState({
      attsWait: state => state.wait.attsWait,
      attType: state => state.explorer.attType,
      playType: state => state.explorer.playType,
      local: state => state.explorer.local,
      attLoading: state => state.wait.loading
    }),
    ...mapGetters([
      'attListFilter',
      'attractionList'
    ]),
    activeAttList() {
      const { type, hotLevel } = this.filters
      let data = this.attListFilter(type)
      if (hotLevel) {
        data = data.filter(_ => _.hotLevel >= hotLevel)
      }
      this.initAttListNumber(data)

      return data
    }
  },
  mounted() {
    this.init()
    // const row = {
    //   aid: 'attSevenDwarfsMineTrain',
    //   runDefault: 40
    // }
    // this.clickAtt(row)
  },

  methods: {
    ...mapActions([
      'getDestinationsList',
      'getDestinationsRawList',
      'getAttractionsWait',
      'getSchedules'
    ]),
    initAttListNumber(data) {
      // data.forEach(item => {
      //   this.mathAttNumber(item)
      // })
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
      // console.log(number)
    },

    async init() {
      await this.getDestinationsList()
      this.getAttractionsWait(this.date)
      // this.getSchedules(this.date)
    },
    async clickAtt(row) {
      this.mathAttNumber(row)
    },

    prevDate() {

    },
    nextDate() {

    }
  }
}
</script>
