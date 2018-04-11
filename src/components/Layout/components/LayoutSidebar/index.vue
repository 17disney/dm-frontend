<template>
  <div class="layout-sidebar">
    <div class="layout-sidebar__logo">
      <icon class="icon" name="shanghai-disney-resort"></icon>
      <span class="title">Disney Resort</span>
    </div>

    <!-- <scroll-bar> -->
    <div class="layout-sidebar__lists">
      <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse">
        <sidebar-item :routes="routes"></sidebar-item>
      </el-menu>
    </div>
    <!-- </scroll-bar> -->
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
  width: $layout-sidebar-width !important;
  background: $color-primary-dark;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  transition: all 0.15s;

  &__lists {
    flex: 1;
    display: flex;
    overflow: hidden;
    flex-grow: 1;
    flex-direction: column;
    overflow: auto;
  }

  &__logo {
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    line-height: 64px;
    height: 64px;
    overflow: hidden;
    text-align: center;

    .icon {
      color: #FFF;
      font-size: 36px;
      margin-right: 5px;
      vertical-align: middle;
    }

    .title {
      display: inline-block;
      color: #FFF;
      font-size: 19px;
      vertical-align: middle;
      font-weight: 600;
    }
  }

  a {
    display: inline-block;
    width: 100%;
  }

  .el-menu {
    border: none;
    width: 100%;
  }
}

.el-submenu {
  // background-color: $color-dark-grey;
  .icon--pep {
    margin-right: 8px;
  }

  &.is-opened {
    .el-submenu__title {
      .icon--pep, span, i {
        color: #FFF;
      }
    }
  }

  .icon--pep, span, i {
    color: rgba(255, 255, 255, 0.55);
    transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &__title {
    background-color: $color-primary-dark !important;

    &:hover {
      .icon--pep, span, i {
        color: #FFF !important;
      }

      background-color: $color-primary-dark !important;
    }
  }

  .el-menu-item {
    height: 40px;
    line-height: 40px;
    padding-left: 49px !important;
    background-color: darken($color-primary-dark, 10) !important;

    &:hover {
      .icon--pep, span, i {
        color: #FFF !important;
      }
    }

    &.is-active {
      background-color: $color-primary !important;

      .icon--pep, span, i {
        color: #FFF;
      }
    }
  }
}

.hideSidebar {
  .sidebar-container, .sidebar-container .el-menu {
    width: 36px !important;
    // overflow: inherit;
  }

  .main-container {
    margin-left: 36px;
  }

  .submenu-title-noDropdown {
    padding-left: 10px !important;
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
