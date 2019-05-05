<template>
  <div class="page bg--gray">
    <dm-header>
      <el-select v-model="filters.type" placeholder="请选择">
        <el-option v-for="item in attType" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      <el-radio-group v-model="filters.isRaw" @change="handleFilterChange">
        <el-radio-button :label="false">存档值</el-radio-button>
        <el-radio-button :label="true">原始值</el-radio-button>
      </el-radio-group>
      <el-checkbox v-model="filters.visible">隐藏不可见</el-checkbox>
      <el-button @click="clickUpdateAttRawList">更新全部</el-button>
    </dm-header>
    <dm-content>
      <dm-card>
        <el-table v-loading.body="listLoading" :data="activeAttList" class="attlist-table" stripe element-loading-text="Loading" fit highlight-current-row>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="WebLink">
                  <span>{{ scope.row.webLink }}</span>
                </el-form-item>
                <el-form-item label="介绍">
                  <span v-for="(desc, index) in scope.row.descriptions" :key="index">{{ desc.text }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="名称">
            <template slot-scope="scope">
              <div class="att-list-item__meta">
                <att-media :medias="scope.row.medias" type="finderListMobileSquare"/>
                <span class="title">
                  {{ scope.row.name }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="热门等级" width="150">
            <template slot-scope="scope">
              <el-rate v-model="scope.row.hotLevel" disabled/>
            </template>
          </el-table-column>
          <el-table-column label="承载量" width="150">
            <template slot-scope="scope">
              <span>
                {{ scope.row.runDefault }} / 分
              </span>
            </template>
          </el-table-column>
          <el-table-column label="游览时长" width="150">
            <template slot-scope="scope">
              <span>
                {{ scope.row.runTimer }} 秒
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="type">
            <template slot-scope="scope">
              <el-button size="small" type="primary" icon="el-icon-edit" @click="clickEditAtt(scope.row)">编辑</el-button>
              <el-button size="small" type="default" plain @click="clickUpdateAtt(scope.row)">更新</el-button>
            </template>
          </el-table-column>
        </el-table>
      </dm-card>
    </dm-content>
    <!-- Form -->
    <el-dialog :title="editForm.form.name" :visible.sync="editForm.visible">
      <el-form :model="editForm.form" label-position="left" label-width="200px">
        <el-form-item label="项目等级">
          <el-slider :min="1" :max="5" v-model="editForm.form.hotLevel" :step="1"/>
        </el-form-item>
        <el-form-item label="游乐类型">
          <el-radio-group v-model="editForm.form.playType">
            <el-radio v-for="item in playType" :key="item.id" :label="item.id" border>{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="最大承载量（分钟）">
          <el-input v-model="editForm.form.runMax" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="标准承载量（分钟）">
          <el-input v-model="editForm.form.runDefault" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="每组人数">
          <el-input v-model="editForm.form.groupNum" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="运行间隔（秒）">
          <el-input v-model="editForm.form.runInterval" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="运行时长（秒）">
          <el-input v-model="editForm.form.runTimer" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch v-model="editForm.form.visible"/>
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
import base from '@/common/mixins/base'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {

  },
  mixins: [base],
  data() {
    return {
      listLoading: false,
      editForm: {
        visible: false,
        form: {}
      },
      filters: {
        type: 'attraction',
        visible: false,
        isRaw: false,
        keyword: null
      }
    }
  },
  computed: {
    ...mapState({
      attList: state => state.explorer.attList,
      attRawList: state => state.explorer.attRawList
    }),

    ...mapGetters([
      'attListFilter',
      'attRawListFilter'
    ]),

    activeAttList() {
      let data = []
      if (this.filters.isRaw) {
        data = this.attRawListFilter(this.filters.type)
      } else {
        data = this.attListFilter(this.filters.type)
        if (this.filters.visible) {
          data = data.filter(_ => _.visible)
        }
      }
      return data
    }
  },

  mounted() {

  },

  methods: {
    handleFilterChange() {
      const { isRaw } = this.filters
      if (isRaw) {
        this.getDestinationsRawList()
      }
    },

    clickUpdateAtt(row) {
      this.updateAtt(row)
    },

    clickEditAtt(row) {
      this.editForm.visible = true
      this.editForm.form = row
    },

    // 更新全部数据
    async clickUpdateAttRawList() {
      const { attRawList } = this
      for (let i = 0; i < attRawList.length; i++) {
        const row = attRawList[i]
        await this.updateAtt(row)
      }
    },

    // 更新数据
    async updateAtt(row) {
      if (!row) row = this.editForm.form
      const { id } = row
      const { local, subType } = this
      const data = {
        local
      }

      if (subType === 'AED') {
        return
      }

      Object.assign(data, row)

      delete data.__v
      await this.$Api.waitTimes.updateDestinationsId(id, data)
      this.Message({
        message: '更新成功',
        type: 'Success'
      })
      this.editForm.visible = false
    }
  }
}
</script>
