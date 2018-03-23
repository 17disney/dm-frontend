<template>
  <div class="page bg--gray">
    <!-- <div class="page-header">

    </div> -->

    <div class="page-content">
      <div class="card">
        <div class="card__body">
          <div class="att-list-form">
            <el-date-picker value-format="yyyy-MM-dd" v-model="filters.date" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
            </el-date-picker>
            <el-button-group>
              <el-button @click="prevDate" type="primary" icon="el-icon-arrow-left">上一天</el-button>
              <el-button @click="nextDate" type="primary">下一天
                <i class="el-icon-arrow-right el-icon--right"></i>
              </el-button>
            </el-button-group>
          </div>
          <att-list :data="attractionList"></att-list>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import Chart from '@/components/Charts/lineMarker'
import AttList from '@/components/AttList'

export default {
  components: { Chart, AttList },

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
      attsWait: state => state.wait.attsWait
    }),
    ...mapGetters([
      'attractionList'

    ])
  },
  mounted() {
    this.init()
  },

  methods: {
    ...mapActions([
      'getDestinationsRawList',
      'getAttractionsWait',
      'getSchedules'
    ]),
    init() {
      this.getAttractionsWait(this.date)
      this.getDestinationsList()
      this.getSchedules(this.date)
    },

    prevDate() {

    },
    nextDate() {

    }
  }
}
</script>
