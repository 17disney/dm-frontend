<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.att-item {
  &-meta {
    padding: 16px 0;
    display: flex;
    align-items: flex-start;
    flex: 1 1 0%;

    &__avatar {
      border-radius: 5px;
      overflow: hidden;
      width: 64px;
      height: 64px;
      margin-right: 16px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &__content {
      flex: 1 0 0%;
    }

    &__title {
      color: $color-dark-grey;
      font-size: 18px;
    }
  }
}
</style>
<template>
  <div class="att-item">
    <div class="att-item-meta">
      <div class="att-item-meta__avatar">
        <img :src="data.finderListMobileSquare.url" alt="">
      </div>
      <div class="att-item-meta__content">
        <h4 class="att-item-meta__title">{{data.name}}</h4>
        <div class="att-item-meta__desc"></div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  components: {},

  props: {
    data: {
      type: Object
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
