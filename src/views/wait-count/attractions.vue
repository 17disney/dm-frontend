<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-select clearable style="width: 120px" class="filter-item" v-model="filters.type" :placeholder="'项目类型'">
        <el-option v-for="item in attsType" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select> -->

      <el-date-picker v-model="date" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
      </el-date-picker>
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left">上一天</el-button>
        <el-button type="primary">下一天
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </el-button-group>

    </div>
    <div class="attlist-wrap">
      <div class="panel panel-att" v-for="item in list" :key="item.id">
        {{item.name}} {{item.landName}}

        <div v-if="waits[item.aid]">
          <chart height='100%' width='100%'></chart>
          {{waits[item.aid]['utime'] | time}}
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
      waits: {}
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
      const arg = {
        raw: true
      }
      const data = await Waits.attractions(this.local, this.date, arg)

      const waits = {}
      data.forEach((item) => {
        waits[item.id] = item
      })
      this.waits = waits
      // console.log(data)
    }
  }
}
</script>

<style lang='styl'>

</style>
