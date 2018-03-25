<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.att-date-select {
  display: flex;
  border: 1px solid $color-light-grey-sss;
  border-radius: 5px;
  color: $color-primary-dark;

  &__btn {
    width: 50px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: $color-primary;
    }
  }

  &__list {
    flex: 1;
    display: flex;
    border-left: 1px solid $color-light-grey-sss;
    border-right: 1px solid $color-light-grey-sss;
  }

  &__item {
    flex: 1;
    text-align: center;
    position: relative;
    border-left: 1px solid $color-light-grey-sss;
    cursor: pointer;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.3s;

    &:hover {
      color: $color-primary;
    }

    &:first-child {
      border: none !important;
    }

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
    <div @click="clickBtn('previous')" class="att-date-select__btn btn-previous">
      <icon name="previous"></icon>
    </div>
    <div class="att-date-select__list">
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
    <div @click="clickBtn('next')" class="att-date-select__btn btn-after">
      <icon name="next"></icon>
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
      this.initList()
    },
    initList(value) {
      const val = value || this.value
      const date = moment(val, 'YYYY-MM-DD')
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
          view: moment(item).format('M月D日'),
          week: '星期' + this.weekName[moment(item).format('E')],
          value: moment(item).format('YYYY-MM-DD')
        })
      })
      this.list = list
    },
    clickItem(value) {
      this.$emit('select-date', value)
    },
    clickBtn(type) {
      var value
      if (type === 'previous') {
        value = moment(this.list[3]['value'], 'YYYY-MM-DD').subtract(7, 'day').format('YYYY-MM-DD')
      } else {
        value = moment(this.list[3]['value'], 'YYYY-MM-DD').add(7, 'day').format('YYYY-MM-DD')
      }
      this.initList(value)
    },

    numHeight(val) {
      let height = val / 50000 * 100
      height = height > 100 ? 100 : height
      return height + '%'
    }
  }
}
</script>
