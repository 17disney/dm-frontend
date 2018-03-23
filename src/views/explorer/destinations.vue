<style lang="stylus" scoped>
@require '../../styles/disney/var/color.styl';

.attlist-table {
}

.att-list-item__meta {
  display: flex;
  align-items: center;

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    overflow: hidden;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .title {
    font-size: 16px;
  }
}
</style>

<template>
  <div class="page bg--gray">
    <div class="page-header">
      <!-- <el-select clearable style="width: 120px" class="filter-item" v-model="filters.type" :placeholder="'项目类型'">
        <el-option v-for="item in attsType" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select> -->
      <el-button type="primary" @click="clickUpdateAttList">更新全部</el-button>
      <el-button>发布</el-button>
    </div>

    <div class="content">
      <div class="card">
        <div class="card__header">
          <!-- <el-tabs tab-position="top">
            <el-tab-pane label="用户管理"></el-tab-pane>
            <el-tab-pane label="配置管理"></el-tab-pane>
            <el-tab-pane label="角色管理"></el-tab-pane>
            <el-tab-pane label="定时任务补偿"></el-tab-pane>
          </el-tabs> -->
          <el-select v-model="filters.type" placeholder="请选择">
            <el-option v-for="item in attType" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>

          <el-radio-group v-model="filters.isRaw">
            <el-radio-button :label="false">存档值</el-radio-button>
            <el-radio-button :label="true">原始值</el-radio-button>
          </el-radio-group>

          <!-- <el-radio-group v-model="filters.type">
            <el-radio border v-for="item in attType" :key="item.id" :label="item.id">{{item.name}}</el-radio>
          </el-radio-group> -->

        </div>
        <div class="card__body">
          <el-table class="attlist-table" stripe :data="activeAttList" v-loading.body="listLoading" element-loading-text="Loading" fit highlight-current-row>
            <el-table-column label="名称">
              <template slot-scope="scope">
                <div class="att-list-item__meta">
                  <att-media :medias="scope.row.medias" type="finderListMobileSquare"></att-media>
                  <span class="title">
                    {{scope.row.name}}
                  </span>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="200" align="type">
              <template slot-scope="scope">
                <el-button size="small" type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button size="small" type="default" @click="clickUpdateAtt(scope.row)" plain>更新</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Explorer from '@/common/api/explorer'

import { mapActions, mapState, mapGetters } from 'vuex'
import AttMedia from '@/components/Att/AttMedia'
export default {
  components: {
    AttMedia
  },
  data() {
    return {
      listLoading: false,
      filters: {
        type: 'attraction',
        isRaw: false,
        keyword: null
      }
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
    this.getDestinationsRawList()
    this.getDestinationsList()
  },
  computed: {

    ...mapState({
      attList: state => state.explorer.attList,
      attRawList: state => state.explorer.attRawList,
      attType: state => state.explorer.attType
    }),
    ...mapGetters([
      'attListFilter',
      'attRawListFilter'
    ]),
    activeAttList: function() {
      if (this.isRaw) {
        return this.attRawListFilter(this.filters.type)
      } else {
        return this.attListFilter(this.filters.type)
      }
    }
  },
  methods: {

    ...mapActions([
      'getDestinationsList',
      'getDestinationsRawList'
    ]),

    clickUpdateAtt(row) {
      this.updateAtt(row)
    },

    async clickUpdateAttList() {
      const { attList } = this
      for (let i = 0; i < attList.length; i++) {
        const row = attList[i]
        await this.updateAtt(row)
      }
    },
    async updateAtt(row) {
      const { ancestors, cacheId, descriptions, facets, finderListMobileSquare, id, medias, name, relatedLocations, type, webLink } = row
      const data = {
        name,
        type,
        cacheId,
        dataRaw: {
          ancestors, descriptions, facets, finderListMobileSquare, medias, relatedLocations, webLink
        }
      }

      await Explorer.updateDestinationsId(id, data)
      this.Message({
        message: '更新成功',
        type: 'Success'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '../../styles/disney/var/color.styl';

.attlist-table {
}

.att-list-item__meta {
  display: flex;
  align-items: center;

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    overflow: hidden;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .title {
    font-size: 16px;
  }
}
</style>
