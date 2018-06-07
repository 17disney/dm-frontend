 <template>
  <div>
    <dm-header>
      <dm-select-date @select-date="clickDate" v-model="date"></dm-select-date>
    </dm-header>
    <dm-content>
      <el-table class="att-list-table" :data="activeAttList" v-loading.body="attLoading.attsWait">
        <el-table-column :label="$t('ds.label.name')">
          <template slot-scope="scope">
            <div class="att-list-item__meta">
              <att-media size="small" :medias="scope.row.medias" type="finderListMobileSquare"></att-media>
              <span class="title">
                {{scope.row.name}}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ds.label.status')" width="150">
          <template slot-scope="scope">
            <att-status v-if="attsWait[scope.row.aid]" :status="attsWait[scope.row.aid]['status']"></att-status>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ds.label.waitsAvg')" width="150">
          <template slot-scope="scope">
            <att-wait-time v-if="attsWait[scope.row.aid]" :wait="attsWait[scope.row.aid]" :time="attsWait[scope.row.aid]['waitAvg']"></att-wait-time>
          </template>
        </el-table-column>
        <el-table-column :label="$t('ds.label.trend')" width="250">
          <template slot-scope="scope">
            <base-line v-if="attsWait[scope.row.aid]" :data="attsWait[scope.row.aid]['waitHour']" :id="scope.row.aid"></base-line>
          </template>
        </el-table-column>
      </el-table>
    </dm-content>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'
import BaseLine from '@/components/Charts/BaseLine'

export default {
  mixins: [base],
  components: { BaseLine },

  data() {
    return {
      date: moment().format('YYYY-MM-DD'),
      attNumber: {},
      filters: {
        hotLevel: 3,
        type: 'attraction'
      }
    }
  },

  computed: {
    ...mapState({
      attsWait: state => state.wait.attsWait,
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

  watch: {
    local: function(val, oVal) {
      this.init()
    }
  },

  methods: {
    async init() {
      this.getAttractionsWait({ date: this.date, local: this.local })
    },

    initAttListNumber(data) {
      data.forEach(item => {
        this.mathAttNumber(item)
      })
    },
    clickDate(date) {
      this.date = date
      this.getAttractionsWait({ date: this.date, local: this.local })
    },

    async mathAttNumber(row) {
      const { aid, runDefault } = row
      const { local, date } = this
      const data = await this.$Api.waitsTimes.attractionsId(local, date, aid)
      const { waitList } = data

      let number = 0
      for (let i = 0; i < waitList.length; i++) {
        const [time, wait] = waitList[i]
        if (wait > 0) {
          const [bTime, bWait] = waitList[i - 1]
          let _runDefault = runDefault
          if (bWait === 5) {
            _runDefault = runDefault * 0.5
          }
          if (bWait === 10) {
            _runDefault = runDefault * 0.7
          }
          const _num = (time - bTime) / 60000 * _runDefault
          number += _num
        }
      }
      this.attNumber[aid] = Math.round(number)
    }
  }
}
</script>
