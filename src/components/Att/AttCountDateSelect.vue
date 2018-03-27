<style lang='stylus' scoped>
</style>
<template>
  <div>
    <el-radio-group v-model="dateMode">
      <el-radio-button label="today">今天</el-radio-button>
      <el-radio-button label="yestday">昨天</el-radio-button>
      <el-radio-button label="7d">最近7天</el-radio-button>
      <el-radio-button label="30d">最近30天</el-radio-button>
    </el-radio-group>
    <el-date-picker v-model="dateRang" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :type="dateType" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
    <att-date-select v-if="dateType === 'date'" @select-date="clickDate" style="margin-top: 16px" v-model="dateRang"></att-date-select>
  </div>
</template>

<script>
import moment from 'moment'
const DATE_FORMAT = 'YYYY-MM-DD'
export default {
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
