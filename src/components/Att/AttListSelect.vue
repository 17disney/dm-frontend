<style lang='stylus'>
@require '../../styles/disney/var/color.styl';

.att-list-select {
  position: relative;
  height: 100%;

  &__list {
    display: flex;
    flex-wrap: wrap;
  }

  &__title {
    font-size: 14px;
    // line-height: 20px;
    align-content: center;
    flex: 1;
  }

  &__item {
    padding: 8px 16px;
    width: 100%;
    cursor: pointer;
    display: flex;
    align-content: center;
    color: $color-dark-grey;

    .att-media {
      margin-right: 16px;
    }

    &.is-active {
      background: #FFF;
      color: $color-primary;
      font-weight: 600;
    }

    &:hover {
      color: $color-primary;
    }
  }
}
</style>
<template>
  <div class="att-list-select">
    <ul class="att-list-select__list">
      <li class="att-list-select__item" :class="{'is-active': item.aid === value}" v-for="item in data" :key="item.id" @click="clickAttItem(item.aid)">
        <att-media size="small" :medias="item.medias"></att-media>
        <span class="att-list-select__title">{{item.name}}</span>
      </li>
    </ul>
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
    },
    value: String
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

  mounted() {
  },

  methods: {
    clickAttItem(id) {
      this.$emit('click-item', id)
    }
  }
}
</script>
