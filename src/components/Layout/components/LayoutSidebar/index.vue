<style lang="stylus">
@require '../../../../styles/disney/var/color.styl';

$layout-sidebar-width = 256px;

.sidebar-nav-list-divider {
  margin: 30px 0;
  height: 1px;

  .divider {
    margin: 0 auto;
    height: 1px;
    width: 180px;
    background-color: rgba(255, 255, 255, 0.2);
  }
}

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
  z-index: 200;

  .logo {
    line-height: 100px;
    height: 100px;
    text-align: center;

    .icon {
      color: rgba(255, 255, 255, 0.8);
      font-size: 36px;
    }
  }

  .el-menu {
    border: none !important;
  }

  &-list {
    flex: 1;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    overflow-x: auto;
  }

  .hideSidebar {
    .layout-sidebar {
      width: 80px;

      &-list {
        overflow: visible;
      }
    }
  }

  .sidebar-collapser {
    background: rgba(255, 255, 255, 0.2);
    border-top: 1px solid $color-light-grey;
    color: #FFF;

    a {
      display: block;
      height: 45px;
      line-height: 45px;
      padding: 0 27px;
    }

    .icon {
      margin-right: 20px;
    }

    span {
      font-size: 14px;
    }
  }
}

.hideSidebar {
  .layout-sidebar {
    width: 80px;

    &-list {
      overflow: visible;
    }
  }
}

.hideSidebar2 {
  .sidebar-container, .sidebar-container .el-menu {
    width: 36px;
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
      <att-icon class="icon" name="shanghai-disney-resort"></att-icon>
    </div>
    <div class="layout-sidebar-list">
      <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse">
        <sidebar-item :routes="routes"></sidebar-item>
      </el-menu>
      <!-- <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse"> -->

      <!-- <dm-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse">
        <sidebar-item :routes="routes"></sidebar-item>
      </dm-menu> -->
      <!-- </el-menu> -->
    </div>
    <div class="sidebar-collapser">
      <a @click="toggleSideBar">
        <i class="el-icon-d-arrow-left icon"></i>
        <span class="label">收缩侧边栏</span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>

