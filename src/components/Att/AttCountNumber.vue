<style lang='stylus' scoped>
</style>
<template>
  <div class="att-couunt-number">
    {{number}} / {{maxNumber}}
    <el-progress :percentage="percentage" ></el-progress>
  </div>
</template>

<script>
import { mathOpenMinutes } from '@/utils'

export default {
  components: {},

  props: {
    data: Object,
    wait: Object,
    number: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      maxNumber: 0,
      percentage: 0
    }
  },

  computed: {},

  mounted() {
    const { startTime, endTime } = this.wait
    const openMinutes = mathOpenMinutes(startTime, endTime)
    const { runDefault } = this.data
    const maxNumber = openMinutes * runDefault
    this.percentage = Math.round(this.number / maxNumber * 100)
    this.maxNumber = maxNumber
  },

  methods: {}
}
</script>
