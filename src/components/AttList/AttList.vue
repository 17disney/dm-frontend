<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.att-item {
  display: flex;
  padding: 8px 16px;
  background: #FFF;
  width: 300px;
  cursor: pointer;

  &.is-active {
    border: 1px solide @color-primary;
  }

  &-meta {
    display: flex;
    align-items: flex-start;
    flex: 1 1 0%;

    &__avatar {
      border-radius: 5px;
      overflow: hidden;
      width: 48px;
      height: 48px;
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
      font-size: 16px;
      font-weight: 500;
    }
  }
}

.att-list {
  display: flex;
  flex-wrap: wrap;

  .att-item {
    border-bottom: 1px solid #EEE;

    &:last-child {
      border: none;
    }
  }
}
</style>
<template>
  <div class="att-list">
    <div class="att-item" :class="{'is-active': item.active}" v-for="item in data" :data="item" :key="item.id" @click="clickAttItem(item)">
      <div class="att-item-meta">{{item.active}}
        <icon name="check"></icon>
        <div class="att-item-meta__avatar">
          <att-media :medias="item.medias"></att-media>
        </div>
        <div class="att-item-meta__content">
          <h4 class="att-item-meta__title">{{item.name}}</h4>
          <div class="att-item-meta__desc"></div>
        </div>
      </div>
      <div class="att-item__content">
        <!-- <div class="att-item__status">
        {{wait.status}}
      </div> -->
        <!-- <div v-if="wait" class="att-item__waits">
          平均等候：{{wait.waitAvg}} 最高等候：{{wait.waitMax}}
          {{schedulesToday.startTime}} - {{schedulesToday.endTime}}
        </div> -->
      </div>

    </div>

  </div>
</template>

<script>
import AttListItem from '@/components/AttList/AttListItem'
import { mapState } from 'vuex'
export default {
  components: { AttListItem },

  props: {
    data: {
      type: Array
    }
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapState({
      attsWait: state => state.wait.attsWait,
      schedules: state => state.explorer.schedules
    })
  },

  mounted() { },

  methods: {
    clickAttItem(row) {
      // console.log(row)
      this.$emit('click-att-item', row.id)
      // row.active = !row.active
    }
  }
}
</script>
