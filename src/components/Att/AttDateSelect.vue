<style lang='stylus' scoped>
@require '../../styles/disney/var/color.styl';

.att-date-select {
  margin: 10px 0;
  display: flex;

  &__item {
    flex: 1;
    text-align: center;
    position: relative;
    border-left: 1px solid #f3f3f3;
    cursor: pointer;

    .bar {
      left: 0;
      right: 0;
      bottom: 0px;
      position: absolute;
      background: $color-primary;
      opacity: 0.1;
    }

    &.is-active {
      color: $color-primary;
      font-weight: 600;
    }
  }

  &__date {
    font-size: 18px;
  }
}
</style>
<template>
  <div class="att-date-select">
    <div @click="clickItem(item.value)" class="att-date-select__item" :class="{'is-active': item.value === value}" v-for="item in list">
      <div class="att-date-select__date">{{item.view}}</div>
      <div class="att-date-select__week">
        {{item.week}}
        <!-- {{item.num}} -->
        <!-- <div class="bar" :style="{height: numHeight(item.num)}"></div> -->
      </div>
      <!-- <att-date-select-item :date="item.key" :data="></att-date-select-item> -->

    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Emitter from '@/common/mixins/emitter'

export default {
  mixins: [Emitter],
  props: {
    // list: Array,
    // data: Object,
    value: String
  },

  data() {
    return {
      list: [],
      weekName: ['', '一', '二', '三', '四', '五', '六', '日']
    }
  },

  computed: {

  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const { value } = this
      const date = moment(value, 'YYYY-MM-DD')
      const dateList = [date]
      for (let i = 1; i <= 3; i++) {
        let _date = moment(date).add(i, 'day')
        dateList.push(_date)
        _date = moment(date).subtract(i, 'day')
        dateList.unshift(_date)
      }
      const list = []
      dateList.forEach(item => {
        list.push({
          view: moment(item).format('MM/DD'),
          week: '星期' + this.weekName[moment(item).format('E')],
          value: moment(item).format('YYYY-MM-DD')
        })
      })
      this.list = list
    },
    clickItem(value) {
      this.$emit('select-date', value)
      // this.value = value
    },
    numHeight(val) {
      let height = val / 50000 * 100
      height = height > 100 ? 100 : height
      return height + '%'
    }
  }
}
</script>
