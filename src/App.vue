<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
export default {
  mixins: [base],

  name: 'app',
  async mounted() {
    await this.getDestinationsList()
  },
  watch: {
    local: function(val, oVal) {
      this.getDestinationsList()
    }
  }
}
</script>

<style lang="stylus">

</style>
