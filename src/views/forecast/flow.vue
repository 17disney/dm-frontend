<style lang='stylus' scoped>
</style>
<template>
  <div class="page bg--gray">
    <div class="page-content">
      <el-card>
        <el-date-picker v-model="dateRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>

      </el-card>

      <el-card>
        <el-table class="att-list-table" :data="parkCountList" >
          <el-table-column label="日期">
            <template slot-scope="scope">
              <div class="att-list-item__meta">
                <span>
                  {{scope.row.date}}
                </span>
              </div>
            </template>
          </el-table-column>

        </el-table>
      </el-card>

    </div>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import { mapState } from 'vuex'
import moment from 'moment'

const DATE_FORMAT = 'YYYY-MM-DD'

export default {
  mixins: [base],
  components: {

  },

  props: {
  },

  data() {
    return {
      dateRange: [moment().format(DATE_FORMAT), moment().subtract(30, 'days').format(DATE_FORMAT)]
    }
  },

  computed: {
    ...mapState({
      parkCountList: state => state.wait.parkList
    })
  },

  mounted() { },

  methods: {}
}
</script>
