<template>
  <el-container>
    <el-dialog width="1000px" title="详情" :visible.sync="addDialog.visible">
      <el-form :model="addDialog.form" ref="ruleForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-upload :on-success="uploadSuccess" class="upload-demo" :data="{'token': token}" drag action="https://upload.qiniup.com" multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
            <timesguide-item :data="addDialog.form"></timesguide-item>
            <a :href="addDialog.form.picUrl" :download="addDialog.form.picUrl">下载</a>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Id" prop="name">
              <el-input v-model="addDialog.form.id"></el-input>
            </el-form-item>
            <el-form-item label="时间" prop="region">
              <el-date-picker @change="dateRangeChange" v-model="addDialog.form.daterange" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="组名" prop="name">
              <el-input v-model="addDialog.form.groupId"></el-input>
            </el-form-item>
            <el-form-item label="位置" prop="name">
              <el-input v-model="addDialog.form.local"></el-input>
            </el-form-item>
            <el-form-item label="质量" prop="name">
              <el-rate v-model="addDialog.form.rate"></el-rate>
            </el-form-item>
            <el-form-item label="图片" prop="name">
              <el-input v-model="addDialog.form.picUrl"></el-input>
            </el-form-item>
            <el-form-item label="贡献者" prop="name">
              <el-input v-model="addDialog.form.author"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleClickUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <el-header>
      <div class="ds-card">
        <admin-header>

          <!-- <el-button type="primary" @click="clickAddBtn">添加</el-button> -->
        </admin-header>
      </div>
    </el-header>
    <el-main>
      <div class="timesguide__list">
        <times-guide @click-item="handleClickTimesguide(item)" v-for="item in list" :key="item.id" :data="item"></times-guide>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Timesguide from '@/common/api/timesguide'
import base from '@/common/mixins/base'
import moment from 'moment'
import TimesGuide from '@/components/timesguide/timesguide'
import TimesguideItem from '@/components/Timesguide/TimesguideItem'
import { TIMESGUIDE_TYPE } from '@/common/const'
import AdminHeader from '@/components/Admin/AdminHeader'

export default {
  components: { TimesGuide, TimesguideItem, AdminHeader },
  mixins: [base],

  data() {
    return {
      list: [],
      type: TIMESGUIDE_TYPE.TICKET,
      page: 1,
      token: '',
      addDialog: {
        visible: false,
        form: {
          daterange: [],
          picName: '',
          id: '',
          groupId: '',
          author: 'xank'
        }
      }
    }
  },

  computed: {},

  async mounted() {
    this.getList()
    const { uploadToken } = await Timesguide.uploadToken()
    this.token = uploadToken
  },

  methods: {
    uploadSuccess(res) {
      this.addDialog.form.picUrl = `http://cdn.17disney.com/${res.hash}`
    },
    clickAddBtn() {
      this.addDialog.visible = true
    },
    handleClickTimesguide(item) {
      const { startDate, endDate } = item
      item.daterange = [startDate, endDate]
      this.addDialog.visible = true
      console.log(item)
      this.addDialog.form = item
    },
    dateRangeChange() {
      const [startDate, endDate] = this.addDialog.form.daterange
      const id = moment(startDate, 'YYYY-MM-DD').format('YYMMDD') + moment(endDate, 'YYYY-MM-DD').format('MMDD')
      const picName = id + '.jpg'
      this.addDialog.form.picName = picName
    },
    async getList() {
      const { local, type } = this
      this.list = await Timesguide.explorerList({ local, type })
    },
    updateById() {

    },
    async handleClickUpdate() {
      const { daterange, id, groupId, local, rate, picUrl } = this.addDialog.form
      const [startDate, endDate] = daterange
      const data = {
        id,
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
        rate,
        picUrl,
        groupId,
        local,
        adminid: '0c8cbd35-e3ba-48c9-844f-833240f9bc78',
        password: 'shds2'
      }
      await Timesguide.updateExplorerId(id, data)
      this.getList()
    }
  }
}
</script>
