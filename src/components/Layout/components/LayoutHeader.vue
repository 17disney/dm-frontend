<style lang="stylus">
@require '../../../styles/disney/var/color.styl';

$layout-header-height = 64px;

.layout-header {
  // position: fixed;
  z-index: 999;
  height: $layout-header-height;
  line-height: $layout-header-height;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 64px;
  flex-shrink: 0;

  &__user {
    height: $layout-header-height;
    float: right;
    display: flex;
  }

  &__action {
    cursor: pointer;
    padding: 0 12px;
    transition: all 0.3s;
    height: 100%;

    &:hover {
      background-color: $color-primary-ss;
    }
  }

  &__avatar {
    // position: relative;
    padding: 15px 0;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .avatar-image {
    width: 34px;
    height: 34px;
    border-radius: 100%;
    overflow: hidden;
    margin-right: 10px;

    >img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }

  .user-name {
    color: $color-primary-dark;
  }

  .hamburger-container {
    line-height: $layout-header-height;
    height: $layout-header-height;
    float: left;
    padding: 0 24px;
    vertical-align: middle;
    padding-top: 4px;
  }

  .app-breadcrumb.el-breadcrumb {
    line-height: $layout-header-height;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
}
</style>

<template>
  <div class="layout-header">
    <el-menu mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <!-- <breadcrumb></breadcrumb> -->
      <div class="layout-header__user">
        <div class="layout-header__action">
          <el-dropdown trigger="hover" class="layout-header__avatar">
            <div class="avatar-image">
              <img :src="avatar">
            </div>
            <div class="user-name">Disney</div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
              <router-link class="inlineBlock" to="/">
                <el-dropdown-item>
                  Home
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <div @click="logout" style="display:block;">LogOut</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
import avatar from '@/assets/mickey-characterSmall.png'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data() {
    return {
      avatar
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>


