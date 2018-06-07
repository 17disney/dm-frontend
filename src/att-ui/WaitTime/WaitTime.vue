<style lang='stylus' scoped>
@require '../../styles/disney/var/color.styl';

.att-wait-time {
  width: 70px;
  // border: 1px solid $color-light-grey-sss;
  line-height: 30px;
  padding: 2px 8px;
  text-align: right;
  // background-color: #f8f8f8;
  border-radius: 3px;
  // color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;

  &__num {
    flex: 1;
    font-weight: 600;
    font-size: 18px;
    // color: $color-primary-dark;
  }

  &__desc {
    // border-left: 1px solid rgba(255, 255, 255, 0.5);
    // padding-left: 6px;
    margin-left: 3px;
    // line-height: 12px;
    font-size: 14px;
  }
}
</style>
<template>
  <div class="att-wait-time" :class="'color-' + color">
    <div class="att-wait-time__num">{{time}}</div>
    <div class="att-wait-time__desc">分</div>
  </div>

</template>

<script>
export default {
  name: 'att-wait-time',

  components: {},

  props: {
    time: Number,
    status: String
  },

  data() {
    return {
    }
  },

  computed: {

    color() {
      const { time } = this
      let color = null
      if (time < 30) {
        color = 'primary'
      } else if (time >= 30 && time < 60) {
        color = 'green'
      } else {
        color = 'red'
      }
      return color
    }
  },

  mounted() { },

  methods: {}
}
</script>
