<style lang='stylus' scoped></style>
<template>
  <div>
    <el-radio-group v-model="dateMode">
      <el-radio-button label="today">今天</el-radio-button>
      <el-radio-button label="yestday">昨天</el-radio-button>
      <el-radio-button label="7d">最近7天</el-radio-button>
      <el-radio-button label="30d">最近30天</el-radio-button>
    </el-radio-group>
    <el-date-picker
      v-model="dateRang"
      :type="dateType"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
    <att-date-select
      v-if="dateType === 'date'"
      v-model="dateRang"
      style="margin-top: 16px"
      @select-date="clickDate"
    />
  </div>
</template>

<script>
const COMPONENT_NAME = 'att-count-date-select'
const DATE_FORMAT = 'YYYY-MM-DD'

import moment from 'moment'

export default {
  name: COMPONENT_NAME,

  components: {},

  props: {
    value: {
      type: [String, Array],
      default: moment().format(DATE_FORMAT)
    }
  },

  data() {
    return {
      dateMode: '',
      dateRang: this.value
    }
  },
  computed: {
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
      this.$emit('click-date', val)
    }
  },

  mounted() {
    console.log(this.value)
  },

  methods: {
    clickDate(date) {
      this.dateRang = date
    }
  }
}
</script>
