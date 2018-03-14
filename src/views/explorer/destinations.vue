<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select clearable style="width: 120px" class="filter-item" v-model="filters.type" :placeholder="'项目类型'">
        <el-option v-for="item in attsType" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <el-table size="small" stripe :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='id' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
          <!-- {{scope.row.id}} -->
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column filter-multiple label="类型" width="200" align="type">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>

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
</template>

<script>
// import { getList } from '@/api/table'
import Explorer from '@/api/explorer'
import { attsType } from '@/common/park-arr'
export default {
  data() {
    return {
      listRaw: [],
      listLoading: true,
      facetGroups: null,
      attsType,
      filters: {
        type: 'attraction',
        keyword: null
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    list: function() {
      return this.listRaw.filter(_ => _.type === this.filters.type)
    }
  },
  methods: {
    fetchData() {
      this.listLoading = true
      Explorer.destinations('shanghai', 'attraction').then(res => {
        const { added, facetGroups } = res
        added.forEach((item) => {
          const { type } = item
          item.type = type.toLowerCase()
        })
        this.listRaw = added
        this.facetGroups = facetGroups
        this.listLoading = false
      })
    },

    updateData() {

    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
