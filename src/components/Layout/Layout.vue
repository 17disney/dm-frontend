<template>
  <div :class="{hideSidebar:!sidebar.opened}" class="layout">
    <!-- <dm-alert></dm-alert> -->
    <layout-sidebar/>
    <div class="layout-main">
      <layout-header/>
      <layout-content/>
    </div>
  </div>
</template>

<script>
import { LayoutHeader, LayoutSidebar, LayoutContent } from './components'

export default {
  name: 'Layout',
  components: {
    LayoutHeader,
    LayoutSidebar,
    LayoutContent
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style lang="stylus">
.layout {
  &-main {
    overflow: hidden;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    overflow: auto;
  }

  &-footer {
  }
}
</style>
