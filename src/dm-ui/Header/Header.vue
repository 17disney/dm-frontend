<style lang='stylus' scoped>
.dm-header {
  margin: 0 32px;
  padding: 32px 0;
  overflow: hidden;
  background: #FFF;
  border-bottom: 1px solid #DDD;
}
</style>
<template>
  <header class="dm-header">
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'dm-header',

  components: {},

  props: {
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
