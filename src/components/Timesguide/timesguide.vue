<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.timesguide {
  &__item {
    position: relative;
    cursor: pointer;
    width: 160px;
    height: 360px;
    background: #FFF;
    margin: 8px 8px;
    box-shadow: inset 0 0 0 1px hsla(0, 0%, 0%, 0.2), inset 0 0 3em hsla(0, 0%, 0%, 0.15), 0 0 0.5em hsla(0, 0%, 0%, 0.25), 0 0.25em 0.25em hsla(0, 0%, 0%, 0.1);
  }

  &__pic {
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
  }

  &__default {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 8px;
    background: $color-primary-ss;
    // background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
    // background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
    // background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
  }

  &__title {
    color: $color-primary;
    padding-top: 20px;
    font-size: 26px;
  }

  &__entitle {
    color: $color-primary;
    padding-top: 0px;
    font-size: 20px;
  }

  &__daterange {
    color: $color-primary;
    padding-top: 0px;
    font-size: 14px;
    font-weight: 600;
  }

  &__icon {
    font-size: 70px;
    margin-top: 50px;
    color: $color-primary;
  }
}
</style>
<template>
  <div @click="clickItem" class="timesguide__item">
    <img class="timesguide__pic" onerror="this.style.display='none'" :src="data.picUrl">
    <div class="timesguide__default">
      <h3 class="timesguide__title">乐园时间表</h3>
      <h3 class="timesguide__entitle">TIMES GUIDE</h3>
      <span class="timesguide__daterange" v-if="data.startDate === data.endDate">{{startDate}}</span>
      <span class="timesguide__daterange" v-else>{{startDate}}-{{endDate}}</span>
      <att-icon class="timesguide__icon" name="shanghai-disney-resort"></att-icon>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  components: {},

  props: {
    data: Object
  },

  data() {
    return {
    }
  },

  computed: {
    startDate() {
      return moment(this.data.startDate, 'YYYY-MM-DD').format('YYYY.MM.DD')
    },
    endDate() {
      return moment(this.data.endDate, 'YYYY-MM-DD').format('MM.DD')
    }
  },

  mounted() { },

  methods: {
    clickItem() {
      this.$emit('click-item', this.data)
    }
  }
}
</script>
