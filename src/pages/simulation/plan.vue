<style lang='stylus' scoped>
</style>
<template>
  <div class="page bg--gray">
    <div class="card">
      <div class="card__body">
        <att-list :data="activeAttList" @click-att-item="clickAttItem"/>

        <el-form ref="form" :model="planForm" label-width="80px">
          <el-form-item label="入园时间">
            <el-time-select
              v-model="planForm.enterTime"
              :picker-options="{
                start: '08:00',
                step: '00:05',
                end: '18:30'
              }"
              placeholder="入园时间"/>
          </el-form-item>
          <el-form-item label="入园日期">
            <el-date-picker v-model="planForm.date" type="date" placeholder="选择日期"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="clickStartSimulation">开始模拟</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
// import moment from 'moment'

export default {
  components: {},

  data() {
    return {
      planForm: {
        date: '2018-03-24',
        enterTime: '',
        attList: [],
        fpList: []
      },
      hotLevel: 3,
      type: 'attraction'
    }
  },

  computed: {
    ...mapGetters([
      'attListFilter'
    ]),
    ...mapState({
      'local': state => state.explorer.local
    }),
    activeAttList() {
      const data = this.attListFilter('attraction')
      data.forEach(item => {
        if (item.active === undefined) {
          item.active = false
        }
      })
      return data.filter(_ => _.hotLevel >= this.hotLevel)
    }

  },

  mounted() {
    this.init()
  },

  methods: {
    ...mapActions([
      'getDestinationsList',
      'getAttractionsWait',
      'getSchedules'
    ]),
    init() {
      const { date } = this.planForm
      this.getDestinationsList()
      this.getAttractionsWait(date)
    },
    clickAttItem(id) {
      console.log(id)
      const row = this.activeAttList.find(_ => _.id === id)
      console.log(row)
      row.active = true
    },
    async clickStartSimulation() {
      const { local } = this
      const { date } = this.planForm
      const id = 'attSevenDwarfsMineTrain'
      const data = await this.$Api.waitTimes.attractionsId(local, date, id)
      console.log(data)
    }

  }
}
</script>
