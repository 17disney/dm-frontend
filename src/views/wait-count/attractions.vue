<template>
  <div class="app-container bg--gray">
    <div class="filter-container">
      <el-date-picker value-format="yyyy-MM-dd" v-model="filters.date" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
      </el-date-picker>
      <el-button-group>
        <el-button @click="prevDate" type="primary" icon="el-icon-arrow-left">上一天</el-button>
        <el-button @click="nextDate" type="primary">下一天
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </el-button-group>
    </div>
    <div class="attlist-wrap">
      <div v-show="item.level >= filters.level" class="panel panel--att" v-for="item in list" :key="item.id">
        <div class="panel__heading">
          <img class="att__avatar" :src="item.finderListMobileSquare.url">
          <div class="panel__heading__text">
            <h3 class="panel__title">{{item.name}}</h3>
            <p class="panel__title__desc">{{item.landName}}</p>
          </div>
        </div>
        <div class="panel__body">
          <div class="att__index" v-if="waits[item.aid]">
            <div class="att__index__item">
              <p class="att__index__text--num">{{waits[item.aid]['waitAvg']}}</p>
              <p class="att__index__text--desc">平均等候</p>
            </div>
            <div class="att__index__item">
              <p class="att__index__text--num">{{waits[item.aid]['waitMax']}}</p>
              <p class="att__index__text--desc">最高等候</p>
            </div>
          </div>
          <div v-if="waits[item.aid]">
            <chart :data="waits[item.aid]['waitHour']" :id="item.aid" height='100%' width='100%'></chart>
            <!-- {{waits[item.aid]['utime'] | time}} -->
          </div>
        </div>
      </div>
    </div>
    <!-- <el-table size="small" stripe :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='id' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column filter-multiple label="类型" width="200" align="type">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>

      <el-table-column filter-multiple label="园区" width="200" align="landName">
        <template slot-scope="scope">
          <span>{{scope.row.landName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200" align="type">
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button size="small" type="primary" plain>更新</el-button>
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Waits from '@/api/waits'
import moment from 'moment'
import Chart from '@/components/Charts/lineMarker'

export default {
  components: { Chart },

  props: {
  },

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
      local: 'shanghai',
      date: moment().format('YYYY-MM-DD'),
      waits: {},
      filters: {
        level: 2,
        date: moment().format('YYYY-MM-DD')
      }
    }
  },

  watch: {
    'filters.date': function(val) {
      this.getWaits()
    }
  },
  computed: {
    ...mapState({
      list: state => state.park.list,
      schedules: state => state.park.schedules
    })
  },

  mounted() {
    this.$store.dispatch('getDestinationsList', 'attraction')
    this.$store.dispatch('getSchedules')
    this.getWaits()
  },

  methods: {
    async getWaits() {
      // const arg = {
      //   raw: true
      // }
      const data = await Waits.attractions(this.local, this.filters.date)

      const waits = {}
      data.forEach((item) => {
        waits[item.id] = item
      })
      this.waits = waits
      // console.log(data)
    },
    prevDate() {

    },
    nextDate() {

    }
  }
}
</script>

<style lang='styl'>

</style>
