
<template>
  <div class="app-container bg--gray">
    <div class="panel">
      <h1>{{aid}}</h1>

      <countLine v-if="isLoad.attCount" :data="attCount[aid]" :id="aid" height='100%' width='100%'></countLine>
      <park-count-line v-if="isLoad.parkCount" :data="parkCount[local]" :id="local" height='100%' width='100%'></park-count-line>
    </div>

    <el-row :gutter="20">
      <el-col :span="6">
        <div class="panel">
          <div class="panel__heading">
            <h3 class="panel__title">日统计</h3>
          </div>
        </div>
        <!-- <div class="grid-content bg-purple"></div> -->
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Waits from '@/api/waits'
import CountLine from '@/components/Charts/countLine'
import ParkCountLine from '@/components/Charts/parkCountLine'

export default {
  components: { CountLine, ParkCountLine },

  props: {
  },

  data() {
    return {
      local: 'shanghai',
      st: '2018-02-16',
      et: '2018-03-14',
      attCount: {},
      parkCount: {},
      ticketCount: {},
      isLoad: {
        attCount: false,
        parkCount: false,
        ticketCount: false
      }
    }
  },

  computed: {
    aid: function() {
      return this.$route.params.id
    }
  },

  mounted() {
    const { aid } = this
    if (aid === ':id') {
      this.$router.push({
        path: '/wait-count/attractions/attSoaringOverHorizon'
      })
    }
    this.init()
  },

  methods: {
    init: async function() {
      let data = []
      const { aid, local } = this
      const arg = {
        st: this.st,
        et: this.et
      }
      data = await Waits.waitCountAttractionsId(local, aid, arg)
      this.attCount[aid] = data
      this.isLoad.attCount = true

      data = await Waits.waitCountPark(local, arg)
      this.parkCount[local] = data
      this.isLoad.parkCount = true
    }
  }
}
</script>
