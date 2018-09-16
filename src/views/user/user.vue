<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
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
        添加用户</el-button>
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
      width="180">
    </el-table-column>

      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        label="时间">
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtDate('YYYY-MM-DD HH:mm')}}
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="100">
        <template slot-scope="scope">
          <el-switch
            @change=handleswc(scope.row)
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[2, 3, 4, 5]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="adddialogFormVisible">
      <el-form
      label-width="80px"
      :model="formData">
        <el-form-item label="用户名:">
          <el-input v-model="formData.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="formData.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="formData.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="formData.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>

export default {
  data () {
    return {
      tableData: [],
      loading: true,
      pageSize: 2,
      total: 100,
      pageNum: 1,
      searchValue: '',
      adddialogFormVisible: false,
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    // 获取用户数据
    async getData () {
      const token = sessionStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = token
      const res = await this.$http.get(`users?pagenum=${this.pageNum}&pagesize=${this.pageSize}&query=${this.searchValue}`)
      this.total = res.data.data.total
      // loading加载结束
      this.loading = false
      const {meta: {msg, status}} = res.data

      if (status === 200) {
        this.tableData = res.data.data.users
      } else {
        this.$message.error(msg)
      }
      console.log(res.data)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.getData()
    },
    // 搜索功能
    handleSearch () {
      this.getData()
    },
    // 删除按钮
    handleDel (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${id}`)
        const {meta: {status, msg}} = res.data
        if (status === 200) {
          this.$message.success(msg)
          this.getData()
        } else {
          this.$message.error(msg)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑开关
    handleswc (user) {
      this.$http.put(`users/${user.id}/state/${user.mg_state}`)
    },
    // 添加按钮
    handleAdd () {

    },
    // 编辑按钮
    handleEdit (index, user) {

    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style>
.searchArea{
  margin-top: 10px;
  margin-bottom: 10px;
}
.searchArea .searchInput{
  width: 350px;
}
.el-table th {
  text-align: center;
}
</style>
