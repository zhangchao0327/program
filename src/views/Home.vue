<template>
  <el-container>
    <el-header>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <img src="/static/logo.png" alt="">
            </div>
          </el-col>
          <el-col :span="19" class="middle">
            <h2 style="margin:0">电商后台管理系统</h2>
          </el-col>
          <el-col :span="1">
            <a href="#"  class="loginout" @click.prevent="handleLogout">退出</a>
          </el-col>
        </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- default-active:默认展开项
          :unique-opened: 只允许同时展开一项
          :router 开启路由模式
          开启后, 设置el-menu-item的index值 为路由标识
        -->
        <el-menu  style="height:100%" default-active="2-1" class="menu" :unique-opened="true" :router="true">
        <!-- 用户管理-->
          <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-search"></i>
                <span>用戶管理</span>
            </template>
          <el-menu-item index="/user">
              <i class="el-icon-location"></i>
            用戶列表
          </el-menu-item>
        </el-submenu>
        <!-- 权限管理-->
        <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-search"></i>
          <span>權限管理</span>
        </template>
                  <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
            角色列表
          </el-menu-item>
            <el-menu-item index="/rights">
              <i class="el-icon-view"></i>
            權限列表
          </el-menu-item>
        </el-submenu>
        <!-- 商品管理-->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-search"></i>
          <span>商品管理</span>
        </template>
                  <el-menu-item index="/goods">
              <i class="el-icon-menu"></i>
            商品列表
          </el-menu-item>
            <el-menu-item index="">
              <i class="el-icon-view"></i>
            分類參數
          </el-menu-item>
           <el-menu-item index="/categores">
              <i class="el-icon-view"></i>
            商品分類
          </el-menu-item>
        </el-submenu>
        <!--订单管理-->
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-search"></i>
                <span>訂單管理</span>
            </template>
          <el-menu-item index="4-1">
              <i class="el-icon-location"></i>
            訂單列表
          </el-menu-item>
        </el-submenu>
        <!--数据统计-->
          <el-submenu index="5">
            <template slot="title">
                <i class="el-icon-search"></i>
                <span>數據統計</span>
            </template>
          <el-menu-item index="5-1">
              <i class="el-icon-location"></i>
            數據報表
          </el-menu-item>
        </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    handleLogout () {
      sessionStorage.clear()
      this.$router.push({ name: 'login' })
    }
  },
  beforeCreate () {
    const token = sessionStorage.getItem('token')
    if (!token) {
      this.$message.error('请先登录')
      this.$router.push({ name: 'login' })
      console.log(sessionStorage.getItem('token'))
    }
  }
}
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 100%;

  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100%; 
  }

  .box-card {
    height: 100%;
  }

  body  .el-container {
    height: 100%;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
