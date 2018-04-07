<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <layout-sidebar></layout-sidebar>
    <div class="layout">
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
