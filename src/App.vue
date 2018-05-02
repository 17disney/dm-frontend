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
  }
}
</script>
