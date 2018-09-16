<template>
  <el-card class="card">
    <el-row class="searchArea">
      <el-col :span="24">
           <el-input class="searchInput"
            clearable placeholder="请输入内容">
            <el-button
              slot="append" icon="el-icon-search"></el-button>
           </el-input>
        <el-button type="success" plain
          @click="$router.push('/goods/add')">
        添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      border>
      <!-- 序号 -->
      <el-table-column
      type="index"
      label="序号"
      width="50">
    </el-table-column>

      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="600">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格（元）"
        width="80">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="80">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="add_time"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.add_time | fmtDate('YYYY-MM-DD HH:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"
          ></el-button>
          <el-button
            type="danger" icon="el-icon-delete" size="mini"></el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[2, 3, 4, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      loading: false,
      total: 100,
      pageSize: 10,
      pageNum: 1

    }
  },
  methods: {
    async loadData () {
      const token = sessionStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = token
      const res = await this.$http.get(`/goods?pagenum=${this.pageNum}&pagesize=${this.pageSize}`)
      console.log(res)
      this.total = res.data.data.total
      this.tableData = res.data.data.goods
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.loadData()
    }
  },
  created () {
    this.loadData()
  }
}
</script>

<style>
  .el-table .cell{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
