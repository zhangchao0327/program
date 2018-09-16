<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="24">
           <el-input class="searchInput"
            v-model="searchValue"
            clearable placeholder="请输入内容">
            <el-button
              @click="handleSearch"
              slot="append" icon="el-icon-search"></el-button>
           </el-input>
        <el-button type="success" plain
          @click="adddialogFormVisible=true">
        添加分类</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      border>
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="cat_level"
        label="级别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="cat_deleted"
        label="是否有效">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"
          @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button type="success" icon="el-icon-check" size="mini"></el-button>
          <el-button
            @click="handleDel(scope.row.id)"
            type="danger" icon="el-icon-delete" size="mini"></el-button>
      </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      loading: false,
      searchValue: ''
    };
  },
   methods: {
    async loadData () {
      const token = sessionStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = token
      const res = await this.$http.get(`categories/3/attributes`)
      console.log(res);
      this.total = res.data.data.total
      this.tableData = res.data.data
    },
    handleSearch () {

    }
  },
  created () {
    this.loadData()
  }

}
</script>

<style>

</style>
