<template>
  <div class="page">
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

    <el-container>
      <el-aside width="300px">
        <att-list-select @click-item="selectAtt" v-model="aid" :data="activeAttList"></att-list-select>
      </el-aside>
      <el-main>
        <el-card>
          <div slot="header" class="clearfix">
            <span>{{att.name}}</span>
          </div>
          <el-row>
            <el-col :span="18">
              <att-media type="finderDetailMobileHero" :medias="att.medias"></att-media>
            </el-col>
            <el-col :span="6">

            </el-col>

          </el-row>
        </el-card>

      </el-main>
    </el-container>

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Waits from '@/common/api/waits'
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
      },
      aid: 'attTronLightcyclePowerRun',
      date: '2018-03-25',
      attWait: {}
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
      'attractionList',
      'attFind'
    ]),
    att() {
      return this.attFind(this.aid)
    },
    activeAttList() {
      const { type, hotLevel } = this.filters
      return this.attListFilter(type, hotLevel)
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    ...mapActions([
      'getDestinationsList',
      'getDestinationsRawList',
      'getAttractionsWait',
      'getSchedules'
    ]),

    async init() {
      this.getDestinationsList()
      this.getAttractionsWait(this.date)
      const { local, date, aid } = this
      const data = Waits.attractionsId(local, date, aid)
      this.attWait = data
    },

    selectAtt(id) {
      this.aid = id
    }
  }
}
</script>
