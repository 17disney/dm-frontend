<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.forecast-item-rate {
  background: $color-grey;
}
</style>
<template>
  <div class="forecast-item-rate" :class="rateClass">
    {{rate}}%
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    rate: Number
  },

  data() {
    return {
    }
  },

  computed: {
    rateClass() {
      if (this.rate < 50) {
        return 'color-red'
      } if (this.rate >= 50 && this.rate <= 80) {
        return 'color-yellow'
      } else {
        return 'color-green'
      }
    }

  },

  mounted() { },

  methods: {}
}
</script>
