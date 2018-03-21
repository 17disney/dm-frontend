<style lang="stylus" scoped>
.attlist-table {
  .avatar {
    width: 64px;
    height: 64px;
    border-radius: 100%;
    overflow hidden
    display inline-block
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title{
    line-height: 64px;
  }
}
</style>

<template>
  <div class="page bg--gray">
    <div class="page-header">
      <!-- <el-select clearable style="width: 120px" class="filter-item" v-model="filters.type" :placeholder="'项目类型'">
        <el-option v-for="item in attsType" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select> -->
      <el-button type="primary">更新</el-button>
      <el-button>发布</el-button>
    </div>

    <div class="content">
      <div class="card">
        <div class="card__header">
          <el-tabs tab-position="top">
            <el-tab-pane label="用户管理"></el-tab-pane>
            <el-tab-pane label="配置管理"></el-tab-pane>
            <el-tab-pane label="角色管理"></el-tab-pane>
            <el-tab-pane label="定时任务补偿"></el-tab-pane>
          </el-tabs>

        </div>
        <div class="card__body">

          <el-table class="attlist-table" stripe :data="attList" v-loading.body="listLoading" element-loading-text="Loading" fit highlight-current-row>

            <el-table-column label="名称">
              <template slot-scope="scope">
                <div class="avatar" v-if="scope.row.finderListMobileSquare && scope.row.finderListMobileSquare.url">
                  <img :src="scope.row.finderListMobileSquare.url" alt="">
                </div>
                <span class="title">
                  {{scope.row.name}}
                </span>

              </template>
            </el-table-column>
            <!-- <el-table-column filter-multiple label="类型" width="200" align="type">
              <template slot-scope="scope">
                <span>{{scope.row.type}}</span>
              </template>
            </el-table-column> -->

            <el-table-column label="操作" width="200" align="type">
              <template slot-scope="scope">
                <el-button size="small" type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button size="small" type="primary" plain>更新</el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column label="Pageviews" width="110" align="center">
              <template slot-scope="scope">
                {{scope.row.pageviews}}
              </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="Status" width="110" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="Display_time" width="200">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span>{{scope.row.display_time}}</span>
              </template>
            </el-table-column> -->
          </el-table>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { attsType } from '@/common/park-arr'
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      listLoading: false
      // listRaw: [],
      // listLoading: true,
      // facetGroups: null,
      // attsType,
      // filters: {
      //   type: 'attraction',
      //   keyword: null
      // }
    }
  },
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       published: 'success',
  //       draft: 'gray',
  //       deleted: 'danger'
  //     }
  //     return statusMap[status]
  //   }
  // },
  created() {
    this.getDestinationsList()
  },
  computed: {

    ...mapState({
      attList: state => state.explorer.attList
    })
  },
  methods: {

    ...mapActions([
      'getDestinationsList'
    ]),

    fetchData() {
      // this.listLoading = true
      // Explorer.destinations('shanghai', 'attraction').then(res => {
      //   const { added, facetGroups } = res
      //   added.forEach((item) => {
      //     const { type } = item
      //     item.type = type.toLowerCase()
      //   })
      //   this.listRaw = added
      //   this.facetGroups = facetGroups
      //   this.listLoading = false
      // })
    },

    updateData() {

    }
  }
}
</script>

<style lang="stylus" scoped>
.attlist-table {
  .avatar {
    width: 40px;
    height: 40px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
