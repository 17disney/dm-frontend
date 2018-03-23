<style lang='stylus'>
.att-media {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  overflow: hidden;
  margin-right: 10px;

  &--finderListMobileSquare {
    width: 48px;
    height: 48px;
  }

  >img {
    width: 100%;
    height: 100%;
  }
}
</style>
<template>
  <div class="att-media" :class="'att-media--' + type"><img :src="url" alt=""></div>
</template>

<script>
export default {
  components: {},

  props: {
    medias: {
      type: Array
    },
    type: {
      type: String
    }
  },

  data() {
    return {
    }
  },

  computed: {
    url: function() {
      return this.medias.find(_ => _.type === this.type)['url']
    }
  },

  mounted() {

  },

  methods: {}
}
</script>
