<template>
  <div class="page bg--gray">

    <el-dialog :visible.sync="editDialog.visible" class="dn-dialog" title="审核">
      <el-row>
        <el-col :span="8">
          <img :src="editDialog.form.picUrl" class="timesguide" alt="">
        </el-col>
        <el-col :span="16">
          <el-form ref="ruleForm" :model="editDialog.form" label-width="100px">
            <el-form-item label="Id" prop="name">
              <el-input v-model="editDialog.form.id"/>
            </el-form-item>
            <el-form-item label="时间" prop="region">
              <el-date-picker v-model="editDialog.form.startDate" value-format="yyyy-MM-dd" type="date" placeholder="开始时间"/>
              <el-date-picker v-model="editDialog.form.endDate" value-format="yyyy-MM-dd" type="date" placeholder="结束时间"/>
            </el-form-item>
            <el-form-item label="类型" prop="name">
              <el-select v-model="editDialog.form.type" placeholder="请选择" @change="updateTimeguideLine">
                <el-option v-for="item in TIMESGUIDE_TYPE_LIST" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="TID" prop="name">
              <el-select v-model="editDialog.form.tid" popper-class="timesguide-dropdown" placeholder="请选择">
                <el-option v-for="item in tidList" :key="item.id" :label="item.startDate + '-' + item.endDate" :value="item.id">
                  <img :src="item.picUrl" width="30px" height="100px" alt="">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="位置" prop="name">
              <el-input v-model="editDialog.form.local"/>
            </el-form-item>
            <el-form-item label="质量" prop="name">
              <el-slider v-model="editDialog.form.rate" :step="1" :min="0" :max="5"/>
            </el-form-item>
            <el-form-item label="图片" prop="name">
              <el-input v-model="editDialog.form.picUrl"/>
            </el-form-item>

            <el-form-item v-if="editDialog.form.user" label="贡献者ID" prop="name">
              <el-input v-model="editDialog.form.user.id"/>
            </el-form-item>

            <el-form-item label="审核操作" prop="name">
              <el-button @click="handleActive">确认审核</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editDialog.visible = false">确 定</el-button>
        <!-- <el-button type="primary" @click="clickCreate">确 定</el-button> -->
      </span>
    </el-dialog>

    <div class="page-content">
      <el-card>
        <el-table :data="list" class="dn-table">
          <el-table-column label="日期">
            <template slot-scope="scope">
              <span>
                {{ scope.row.created_at }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="图片">
            <template slot-scope="scope">
              <span>
                <img :src="scope.row.picUrl" class="timesguide" alt="">
              </span>
            </template>
          </el-table-column>

          <el-table-column label="用户">
            <template slot-scope="scope">
              <div v-if="scope.row.user" class="userinfo">
                <img :src="scope.row.user.avatar" class="userinfo__avatar" alt="">
                <div class="userinfo__name">{{ scope.row.user.name }}</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="是否审核">
            <template slot-scope="scope">
              <span>
                <el-tag v-if="!scope.row.isActive">待审核</el-tag>
                <el-tag v-if="scope.row.isActive" type="info">已审核</el-tag>
              </span>
            </template>
          </el-table-column>

          <el-table-column label="质量">
            <template slot-scope="scope">
              <span>
                <el-rate v-model="scope.row.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"/>
              </span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <span>
                <el-button @click="handleEdit(scope.row)">编辑</el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import Timesguide from '17disney-common/api/timesguide'
import { TIMESGUIDE_TYPE_LIST } from '@/common/const'
// import moment from 'moment'

export default {
  components: {},

  data() {
    return {
      TIMESGUIDE_TYPE_LIST,
      list: [],
      tidList: [],
      editDialog: {
        visible: false,
        form: {}
      }
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      const list = await Timesguide.contributesList()
      this.list = list
    },

    async updateTimeguideLine() {
      const params = {
        local: 'shanghai',
        type: this.editDialog.form.type
      }
      this.tidList = await Timesguide.explorerList(params)
    },

    async handleActive(active) {
      const { rate, startDate, endDate, tid, local, id, picUrl, type } = this.editDialog.form

      const arg = {
        rate, startDate, endDate, tid, local, picUrl, type,
        adminid: '0c8cbd35-e3ba-48c9-844f-833240f9bc78',
        password: ''
      }

      await Timesguide.activeContributesId(id, arg)
    },
    handleEdit(form) {
      this.editDialog.visible = true
      this.editDialog.form = form
    }
  }
}
</script>
