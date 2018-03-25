<style lang='stylus'>

</style>
<template>
  <div class="att-item"  @click="clickAttItem(data)">
    <div class="att-item-meta">
      <icon name="check"></icon>
      <div class="att-item-meta__avatar">
        <att-media :medias="data.medias"></att-media>
      </div>
      <div class="att-item-meta__content">
        <h4 class="att-item-meta__title">{{data.name}}</h4>
        <div class="att-item-meta__desc"></div>
      </div>
    </div>
    <div class="att-item__content">
      <!-- <div class="att-item__status">
        {{wait.status}}
      </div> -->
      <div v-if="wait" class="att-item__waits">
        平均等候：{{wait.waitAvg}} 最高等候：{{wait.waitMax}}
        <!-- {{schedulesToday.startTime}} - {{schedulesToday.endTime}} -->
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
// import

export default {
  components: {

  },

  props: {
    data: {
      type: Object
    },
    wait: {
      type: Object
    },
    scheduleList: {
      type: Array
    }
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapState({
      today: state => state.app.today
    }),
    schedulesToday() {
      // return this.scheduleList.find(item => item.date === this.today)
    }
  },

  mounted() { },

  methods: {}
}
</script>
