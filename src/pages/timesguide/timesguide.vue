<style lang='stylus' scoped>
</style>
<template>
  <div class="page bg--gray">
    <el-dialog title="添加" :visible.sync="addDialog.visible">
      <el-form :model="addDialog.form" ref="ruleForm" label-width="100px">
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
        <el-form-item label="图片名" prop="name">
          <el-input v-model="addDialog.form.picName"></el-input>
        </el-form-item>
        <el-form-item label="贡献者" prop="name">
          <el-input v-model="addDialog.form.author"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="clickCreate">确 定</el-button>
      </span>
    </el-dialog>
    <div class="page-content">
      <div class="card">
        <el-button type="primary" @click="clickAddBtn">添加</el-button>
      </div>
    </div>

    <div class="timesguide__list">
      <times-guide @click-item="clickUpdate(item)" v-for="item in list" :key="item.id" :data="item"></times-guide>
    </div>

  </div>
</template>

<script>
import Timesguide from '@/common/api/timesguide'
import base from '@/common/mixins/base'
import moment from 'moment'
import TimesGuide from '@/components/timesguide/timesguide'

export default {
  components: { TimesGuide },
  mixins: [base],

  data() {
    return {
      list: [],
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

  mounted() {
    this.getList()
  },

  methods: {
    clickAddBtn() {
      this.addDialog.visible = true
    },
    clickUpdate(item) {
      const { startDate, endDate } = item
      item.daterange = [startDate, endDate]
      this.addDialog.visible = true
      this.addDialog.form = item
    },
    dateRangeChange() {
      const [startDate, endDate] = this.addDialog.form.daterange
      const id = moment(startDate, 'YYYY-MM-DD').format('YYMMDD') + moment(endDate, 'YYYY-MM-DD').format('MMDD')
      const picName = id + '.jpg'
      this.addDialog.form.picName = picName
    },
    async getList() {
      const { local } = this
      const list = await Timesguide.explorerList(local)
      this.list = list
    },
    updateById() {

    },
    async clickCreate() {
      const { daterange, id, picName, groupId, local, rate, author } = this.addDialog.form
      const [startDate, endDate] = daterange
      const data = {

        id,
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
        rate,
        author,
        picName,
        groupId,
        local
      }
      await Timesguide.updateExplorerId(id, data)
      this.Message({
        message: '添加成功',
        type: 'Success'
      })
      this.getList()
    }
  }
}
</script>
