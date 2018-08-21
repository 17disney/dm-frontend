<style lang="stylus">
@require '../../../../styles/disney/var/color.styl';

.hideSidebar {
  .el-submenu {
    &__title {
      padding: 0 32px !important;
    }

    .icon--pep {
      margin-right: 0px;
    }

    span, i {
      opacity: 0;
      max-width: 0;
    }

    .el-menu.el-menu--collapse {
      padding: 0px;
      margin-left: 20px;
      overflow: hidden;
      border-radius: 4px;

      &-item {
        background-color: $color-primary-dark;
        padding-left: 10px !important;

        span {
          opacity: 1;
          vertical-align: top;
          // color: hsla(0, 0%, 100%, 0.65);
        }
      }
    }
  }
}

.dm-menu-item {
  .el-submenu {
    .icon--pep {
      font-size: 15px;
      display: inline-block;
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
      background-color: $color-primary-dark;

      &:hover {
        .icon--pep, span, i {
          color: #FFF;
        }

        background-color: $color-primary-dark;
      }
    }

    .el-menu-item {
      height: 40px;
      line-height: 40px;
      padding-left: 50px !important;
      background-color: darken($color-primary-dark, 10);

      &:hover {
        .icon--pep, span, i {
          color: #FFF;
        }
      }

      &.is-active {
        background-color: $color-primary;

        .icon--pep, span, i {
          color: #FFF;
        }
      }
    }
  }
}
</style>
<template>
  <div class="dm-menu-item">
    <!-- <template v-for="item in routes">
      <router-link :to="`${item.path}/${item.children[0].path}`" :key="item.children[0].name">
        <dm-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <att-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :name="item.children[0].meta.icon"></att-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
        </dm-menu-item>
      </router-link>
    </template> -->
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <router-link v-if="item.children.length===1 && !item.children[0].children && !item.alwaysShow" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <att-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :name="item.children[0].meta.icon"></att-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <att-icon v-if="item.meta&&item.meta.icon" :name="item.meta.icon"></att-icon>
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>
        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>
          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <att-icon v-if="child.meta&&child.meta.icon" :name="child.meta.icon"></att-icon>
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  }
}
</script>

