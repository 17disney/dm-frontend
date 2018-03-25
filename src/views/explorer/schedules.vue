<style lang="stylus">
@require '../../styles/disney/var/color.styl';


</style>

<template>
  <div class="page bg--gray">
    <div class="page-header">
      <el-button type="primary" @click="clickUpdateAttRawList">更新全部</el-button>
      <el-button>发布</el-button>
    </div>

    <div class="content">
      <div class="card">
        <div class="card__header">
          <el-select v-model="filters.type" placeholder="请选择">
            <el-option v-for="item in attType" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="card__body">
          <el-table class="attlist-table" stripe :data="attListFilter(filters.type)" v-loading.body="listLoading" element-loading-text="Loading" fit highlight-current-row>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="WebLink">
                    <span>{{ scope.row.webLink }}</span>
                  </el-form-item>
                  <el-form-item label="介绍">
                    <span v-for="desc in scope.row.descriptions">{{ desc.text}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
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
            <el-table-column label="热门等级" width="150">
              <template slot-scope="scope">
                <el-rate v-model="scope.row.hotLevel" disabled></el-rate>
              </template>
            </el-table-column>
            <el-table-column label="承载量" width="150">
              <template slot-scope="scope">
                <span>
                  {{scope.row.runDefault}} / 分
                </span>
              </template>
            </el-table-column>
            <el-table-column label="游览时长" width="150">
              <template slot-scope="scope">
                <span>
                  {{scope.row.runTimer}} 秒
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="type">
              <template slot-scope="scope">
                <el-button size="small" type="primary" @click="clickEditAtt(scope.row)" icon="el-icon-edit">编辑</el-button>
                <el-button size="small" type="default" @click="clickUpdateAtt(scope.row)" plain>更新</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- Form -->
    <el-dialog :title="editForm.form.name" :visible.sync="editForm.visible">
      <el-form label-position="left" :model="editForm.form" label-width="200px">
        <el-form-item label="项目等级">
          <el-slider :min="1" :max="5" v-model="editForm.form.hotLevel" :step="1"></el-slider>
        </el-form-item>
        <el-form-item label="游乐类型">
          <el-radio-group v-model="editForm.form.playType">
            <el-radio border v-for="item in playType" :key="item.id" :label="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editForm.visible = false">取 消</el-button>
        <el-button type="primary" @click="updateAtt()">确 定</el-button>
      </div>
    </el-dialog>
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
      editForm: {
        visible: false,
        form: {}
      },
      filters: {
        type: 'attraction',
        isRaw: false,
        keyword: null
      }
    }
  },
  created() {
    this.getDestinationsList()
  },
  computed: {
    ...mapState({
      attList: state => state.explorer.attList,
      attType: state => state.explorer.attType,
      playType: state => state.explorer.playType,
      local: state => state.explorer.local
    }),
    ...mapGetters([
      'attListFilter'
    ])
  },
  methods: {
    ...mapActions([
      'getDestinationsList'
    ]),

    clickUpdateAtt(row) {
      this.updateAtt(row)
    },

    clickEditAtt(row) {
      this.editForm.visible = true
      this.editForm.form = row
    },

    async updateAtt(row) {
      if (!row) row = this.editForm.form
      const { id } = row
      const { local } = this
      const data = {
        local
      }
      Object.assign(data, row)

      delete data.__v
      await Explorer.updateDestinationsId(id, data)
      this.Message({
        message: '更新成功',
        type: 'Success'
      })
      this.editForm.visible = false
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '../../styles/disney/var/color.styl';

.att-list-item__meta {
  display: flex;
  align-items: center;

  .att-media {
    margin: 16px;
  }

  .title {
    font-size: 16px;
  }
}
</style>
