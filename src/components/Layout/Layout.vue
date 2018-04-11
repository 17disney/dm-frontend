<template>
  <div class="layout" :class="{hideSidebar:!sidebar.opened}">
    <layout-sidebar></layout-sidebar>
    <div class="layout-main">
      <layout-header></layout-header>
      <layout-content></layout-content>
    </div>
  </div>
</template>

<script>
import { LayoutHeader, LayoutSidebar, LayoutContent } from './components'

export default {
  name: 'layout',
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
    flex-grow: 1;
    overflow: hidden;
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
