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
    <att-list-item v-for="item in data" :data="item" :key="item.id">

    </att-list-item>
  </div>
</template>

<script>
import AttListItem from '@/components/AttList/AttListItem'

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

  computed: {},

  mounted() { },

  methods: {}
}
</script>
