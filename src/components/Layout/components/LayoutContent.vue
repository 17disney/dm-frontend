<template>
  <div class="layout-content">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LayoutContent'
}
</script>
