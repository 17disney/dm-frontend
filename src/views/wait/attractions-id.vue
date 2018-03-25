
<template>
  <div class="page bg--gray">
    <!-- <div class="panel">
      <div class="panel__heading">
        <h3 class="panel__title">{{aid}}</h3>
      </div>
      <div class="panel__body">
        <countLine type="att" v-if="isLoad.attCount" :data="attCount[aid]" :id="aid" height='100%' width='100%'></countLine>
      </div>
    </div>

    <div class="panel">
      <div class="panel__heading">
        <h3 class="panel__title">乐园客流量</h3>
      </div>
      <div class="panel__body">
        <countLine type="park" v-if="isLoad.attCount" :data="parkCount[local]" :id="'park-' + local" height='100%' width='100%'></countLine>
      </div>
    </div>

    <div class="panel">
      <div class="panel__heading">
        <h3 class="panel__title">乐园售票量</h3>
      </div>
      <div class="panel__body">
        <countLine type="ticket" v-if="isLoad.ticketCount" :data="ticketCount[local]" :id="'ticket-' + local" height='100%' width='100%'></countLine>
      </div>
    </div> -->
    <div class="page-content">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="panel">
            <div class="panel__heading">
              <h3 class="panel__title">日统计</h3>
            </div>
          </div>
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

  </div>
</template>

<script>
import CountLine from '@/components/Charts/countLine'
import ParkCountLine from '@/components/Charts/parkCountLine'
import TicketCountLine from '@/components/Charts/ticketCountLine'
export default {
  components: { CountLine, ParkCountLine, TicketCountLine },

  props: {
  },

  data() {
    return {
      st: '2018-02-16',
      et: '2018-03-14',
      isLoad: {
        attCount: false,
        parkCount: false,
        ticketCount: false
      }
    }
  },

  computed: {
    // aid: function () {
    //   return this.$route.params.id
    // }
  },

  mounted() {
    this.init()
  },

  methods: {
    init: async function() {
      // let data = []
      // const { aid, local } = this
      // const arg = {
      //   st: this.st,
      //   et: this.et
      // }
      // data = await Waits.waitCountAttractionsId(local, aid, arg)
      // data = data.reverse()
      // this.attCount[aid] = data
      // this.isLoad.attCount = true

      // data = await Waits.waitCountPark(local, arg)
      // data = data.reverse()
      // this.parkCount[local] = data
      // this.isLoad.parkCount = true

      // data = await Ticket.available(local, arg)
      // this.ticketCount[local] = data
      // this.isLoad.ticketCount = true
    }
  }
}
</script>
