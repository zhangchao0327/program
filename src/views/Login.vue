<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formData">
      <h2>用户登录</h2>
      <el-form-item label="用户名" >
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button class="login-button" type="primary" @click="handlelogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handlelogin () {
      this.$http
        .post('login', this.formData)
        .then((response) => {
          console.log(response)
          const {meta: { status, msg }} = response.data
          if (status === 200) {
            const token = response.data.data.token
            sessionStorage.setItem('token', token)
            this.$router.push({name: 'home'})
          } else {
            this.$massage.worning(msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
    .login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .login-form .login-button {
  width: 100%;
}
</style>
