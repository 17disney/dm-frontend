<style lang='stylus'>
</style>
<template>
  <div class="page bg--gray">
    <dm-content>
      <dm-card>
        <el-table :data="data">
          <el-table-column prop="time" label="时间" width="180"></el-table-column>
          <el-table-column prop="time" label="时间" width="180">
            <template slot-scope="scope">
              {{scope.row.time / 25}}
            </template>
          </el-table-column>
          <el-table-column label="烟花类型">
            <template slot-scope="scope">
              <div v-for="item in scope.row.fire">
                {{item.type}}: {{item.position}} - {{item.num || 1}}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </dm-card>
    </dm-content>
  </div>
</template>

<script>
import * as FIRE from '@/common/const/fire'

export default {
  components: {},

  props: {},

  data() {
    return {
      FIRE,
      data: FIRE.DATA
    }
  },

  computed: {},

  created() {
    console.log('23')
  },

  mounted() {
    console.log(FIRE)
  },

  methods: {}
}
</script>
