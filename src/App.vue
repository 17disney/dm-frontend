<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import base from '@/common/mixins/base'
export default {

  name: 'App',
  mixins: [base],
  watch: {
    local: function(val, oVal) {
      this.getDestinationsList()
    }
  },
  async mounted() {
    const { locale } = this.$store.state.app
    if (!locale) {
      this.$store.dispatch('setLocale', 'zh-hans')
    } else {
      this.$store.dispatch('setLocale', locale)
    }
    await this.getDestinationsList()
  }
}
</script>

<style lang="stylus">

</style>
