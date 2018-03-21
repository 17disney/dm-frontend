<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="layout">
      <layout-header></layout-header>
      <layout-content></layout-content>
    </div>
  </div>
</template>

<script>
import { LayoutHeader, Sidebar, LayoutContent } from '@/views/layout/components'

export default {
  name: 'layout',
  components: {
    LayoutHeader,
    Sidebar,
    LayoutContent
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>
