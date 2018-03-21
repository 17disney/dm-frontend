<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.att-list {
  .att-item {
    border-bottom: 1px solid #EEE;
  }
}
</style>
<template>
  <div class="att-list">
    <att-list-item v-for="item in data" :wait="attsWait[item.aid]" :schedule-list="schedules[item.aid]" :data="item" :key="item.id"></att-list-item>
  </div>
</template>

<script>
import AttListItem from '@/components/AttList/AttListItem'
import { mapState } from 'vuex'
export default {
  components: { AttListItem },

  props: {
    data: {
      type: Array
    }
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapState({
      attsWait: state => state.wait.attsWait,
      schedules: state => state.explorer.schedules
    })
  },

  mounted() { },

  methods: {}
}
</script>
