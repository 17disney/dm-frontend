<style lang="stylus">
@require '../../../styles/disney/var/color.styl';

$layout-header-height = 64px;

.layout-header {
  z-index: 999;
  height: $layout-header-height;
  line-height: $layout-header-height;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 64px;
  flex-shrink: 0;
  padding-right: 24px;

  &__menu {
    float: right;
  }

  &__user {
    height: $layout-header-height;
    // float: right;
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
    <el-menu menu-trigger="click" @select="handleSelect" mode="horizontal">
      <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger> -->
      <div class="layout-header__menu">
        <el-submenu index="local">
          <template slot="title">{{$t('ds.disneyLand.' + local)}}</template>
          <el-menu-item v-for="item in LOCAL" :key="item.value" :index="'local--' + item.value">{{$t(item.label)}}</el-menu-item>
        </el-submenu>

        <el-submenu index="locale">
          <template slot="title">{{locale | locale}}</template>
          <el-menu-item v-for="item in LOCALE" :key="item.value" :index="'locale--' + item.value">{{item.label}}</el-menu-item>
        </el-submenu>
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
      </div>

    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import LOCAL from '@/common/const/local'
import LOCALE from '@/common/const/locale'
import avatar from '@/assets/mickey-characterSmall.png'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import base from '@/common/mixins/base'

export default {
  mixins: [base],
  data() {
    return {
      avatar,
      LOCAL,
      LOCALE
    }
  },

  components: {
    Breadcrumb,
    Hamburger
  },

  computed: {
    ...mapState({
      'locale': state => state.app.locale
    }),
    ...mapGetters([
      'sidebar'
    ])
  },

  mounted() {
  },

  methods: {
    handleSelect(e) {
      const [type, value] = e.split('--')

      if (type === 'locale') {
        this.$store.dispatch('setLocale', value)
      }

      if (type === 'local') {
        this.$store.dispatch('setLocal', value)
      }
    },
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


