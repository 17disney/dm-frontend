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
    font-size: 15px;
    flex: 1;
    line-height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__item {
    padding: 8px 24px;
    padding-left: 48px;
    width: 100%;
    cursor: pointer;
    display: flex;
    align-content: center;
    color: $color-dark-grey;

    .att-media {
      margin-right: 16px;
    }

    &.is-active {
      background: $color-light-grey-sss;
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
      <el-tooltip v-for="item in data" :key="item.id" :content="item.name" class="item" effect="dark" placement="right">
        <li :class="{'is-active': item.aid === value}" class="att-list-select__item" @click="clickAttItem(item.aid)">
          <att-media :medias="item.medias" size="small"/>
          <span class="att-list-select__title">{{ item.name }}</span>
        </li>
      </el-tooltip>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: { },

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
