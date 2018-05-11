<style lang="stylus">
@require '../../../../styles/disney/var/color.styl';

$layout-sidebar-width = 256px;

.layout-sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  height: inherit;
  flex-shrink: 0;
  transition: width 0.28s;
  width: $layout-sidebar-width;
  background: $color-primary-dark;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);

  .logo {
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    line-height: 64px;
    height: 64px;
    text-align: center;

    .icon {
      color: #FFF;
      font-size: 36px;
    }
  }

  .el-menu {
    border: none;
  }

  &-list {
    flex: 1;
    display: flex;
    overflow: hidden;
    flex-grow: 1;
    flex-direction: column;
    overflow: auto;
  }
}

.hideSidebar {
  .sidebar-container, .sidebar-container .el-menu {
    width: 36px;
    // overflow: inherit;
  }

  .main-container {
    margin-left: 36px;
  }

  .submenu-title-noDropdown {
    padding-left: 10px;
    position: relative;

    span {
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);
      opacity: 0;
      display: inline-block;
    }

    &:hover {
      span {
        display: block;
        border-radius: 3px;
        z-index: 1002;
        width: 140px;
        height: 56px;
        visibility: visible;
        position: absolute;
        right: -145px;
        text-align: left;
        text-indent: 20px;
        top: 0px;
        background-color: $subMenuBg !important;
        opacity: 1;
      }
    }
  }

  .el-submenu {
    &>.el-submenu__title {
      padding-left: 10px !important;

      &>span {
        display: none;
      }

      .el-submenu__icon-arrow {
        display: none;
      }
    }

    .nest-menu {
      .el-submenu__icon-arrow {
        display: block !important;
      }

      span {
        display: inline-block !important;
      }
    }
  }
}
</style>


<template>
  <div class="layout-sidebar">
    <div class="logo">
      <icon class="icon" name="shanghai-disney-resort"></icon>
    </div>
    <div class="layout-sidebar-list">
      <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse">
        <sidebar-item :routes="routes"></sidebar-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

