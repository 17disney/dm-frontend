<style lang='stylus'>
.sub-aside {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 300px;
  border-right: 1px solid #EEE;
  padding: 32px 0;
}
</style>
<template>
  <div class="sub-aside">
    <slot></slot>
  </div>
</template>

<script>

export default {
  components: {},

  props: {
  },

  data() {
    return {
      settings: {
        maxScrollbarLength: 60
      }

    }
  },

  computed: {},

  mounted() { },

  methods: {}
}
</script>
