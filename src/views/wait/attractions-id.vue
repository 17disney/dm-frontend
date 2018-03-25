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
import { mapState, mapActions, mapGetters } from 'vuex'
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
      filters: {
        hotLevel: 3,
        type: 'attraction'
      }
    }
  },

  computed: {
    ...mapState({
      local: state => state.explorer.local,
      attsWait: state => state.wait.attsWait,
      attType: state => state.explorer.attType,
      playType: state => state.explorer.playType,
      attLoading: state => state.wait.loading
    }),
    ...mapGetters([
      'attListFilter',
      'attractionList'
    ]),
    activeAttList() {
      const { type, hotLevel } = this.filters
      return this.attListFilter(type, hotLevel)
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init: function() {
      this.getDestinationsList()
      this.getAttractionsWait(this.date)
    }
  }
}
</script>
