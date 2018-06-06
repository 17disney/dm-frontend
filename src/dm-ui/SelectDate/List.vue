<style lang='stylus'>
</style>
<template>
  <div class="att-date-select__list">
    <div @click="clickItem(item.value)" class="att-date-select__item" :class="{'is-active': item.value === value}" v-for="item in list">
      <div class="att-date-select__date">{{item.view}}</div>
      <div class="att-date-select__week">
        {{item.week}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
  },

  data() {
    return {
    }
  },

  computed: {},

  mounted() {

  },

  methods: {
    clickItem(value) {
      this.$emit('select-date', value)
    }

  }
}
</script>
