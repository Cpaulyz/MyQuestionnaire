<template>
  <div class="login">
    <el-card class="board" v-show="currentPage === 'login'">
      <div slot="header">
        <span class="title">登录</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="goto('register')"
        >新用户？前往注册</el-button>
      </div>

      <el-form
        :model="loginForm"
        status-icon
        :rules="rules1"
        ref="loginForm"
        label-width="80px"
      >
        <el-form-item prop="username1">
          <el-input
            v-model="loginForm.username1"
            type="text"
            placeholder="用户名"
            prefix-icon="el-icon-user"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="text"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 80%"
            type="primary"
            :loading="loginLoading"
            @click="submitLogin()"
            >登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="board" v-show="currentPage === 'register'">
      <div slot="header">
        <span class="title">注册</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="goto('login')"
        >
          已注册？前往登入
        </el-button>
      </div>
      <el-form
        :model="registerForm"
        status-icon
        :rules="rules2"
        ref="registerForm"
        label-width="80px"
      >
        <el-form-item prop="email">
          <el-input
            v-model="registerForm.email"
            type="text"
            placeholder="邮箱"
            prefix-icon="el-icon-message"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="newUser">
          <el-input
            v-model="registerForm.newUser"
            type="text"
            placeholder="用户名"
            prefix-icon="el-icon-user"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phoneNum">
          <el-input
            v-model="registerForm.phoneNum"
            type="text"
            placeholder="手机号"
            prefix-icon="el-icon-phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="newPW">
          <el-input
            v-model="registerForm.newPW"
            type="text"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPW">
          <el-input
            v-model="registerForm.confirmPW"
            type="text"
            placeholder="确认密码"
            prefix-icon="el-icon-lock"
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 80%"
            type="primary"
            :loading="registerLoading"
            @click="submitRegister()"
          >注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    let validateUser1 = (rule, value, callback) => {
      // const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (value !== '') {
        // console.log('success')
        callback()
      } else {
        callback(new Error('请输入用户名'))
      }
      callback()
    }

    let validateEmail = (rule, value, callback) => {
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (regex.test(value)) {
        // console.log('success')
        callback()
      } else {
        callback(new Error('请输入有效邮箱'))
      }
    }

    let validateUser2 = (rule, value, callback) => {
      // const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (value !== '') {
        // console.log('success')
        callback()
      } else {
        callback(new Error('请输入用户名'))
      }
      callback()
    }

    let validatePhoneNum = (rule, value, callback) => {
      const regex = /^[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)$/
      if (regex.test(value) && value.length === 11) {
        callback()
      } else {
        callback(new Error('请输入有效手机号'))
      }
      callback()
    }

    let validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度至少为6位'))
      } else {
        if (this.registerForm.confirmPW !== '') {
          this.$refs.registerForm.validateField('confirmPW')
        }
        callback()
      }
    }

    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.newPW) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }

    return {
      currentPage: 'login',
      loginLoading: false,
      registerLoading: false,
      loginForm: {
        username1: '',
        password: ''
      },
      registerForm: {
        email: '',
        newUser: '',
        phoneNum: '',
        newPW: '',
        confirmPW: ''
      },
      rules1: {
        username1: [{ validator: validateUser1, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      },
      rules2: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        newUser: [{ validator: validateUser2, trigger: 'blur' }],
        phoneNum: [{ validator: validatePhoneNum, trigger: 'blur' }],
        newPW: [{ validator: validatePass, trigger: 'blur' }],
        confirmPW: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.goto('login')
  },
  destroyed() {
    // console.log('destroyed')
    document.onkeypress = null
  },
  methods: {
    ...mapActions([
      'login',
      'register'
    ]),
    registerKeyboardListener(page) {
      document.onkeypress = null

    },
    goto(page) {
      document.onkeypress = null
      const formName = page.charAt(0).toUpperCase() + page.substring(1)
      document.onkeypress = (e) => {
        if (e.charCode === 13) {
          this['submit' + formName]()
        }
      }
      this.currentPage = page
      this.$nextTick(() => {
        this.$refs[page + 'Form'].resetFields()
      })
    },
    submitLogin() {
      console.log('submit login')
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // console.log(this.loginForm)
          this.login(this.loginForm).then(res => {
            if (res) {
              this.$notify.success({
                title: '登入成功'
              })
              this.$router.push({ name: 'overview' })
            } else {
              this.$notify.error({
                title: '登入失败'
              })
            }
          })
        } else {
          console.log('loginForm invalid')
        }
      })
    },
    submitRegister() {
      console.log('submit register')
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          console.log(this.registerForm)
          this.register(this.registerForm).then(res => {
            if (res) {
              this.$notify.success({
                title: '注册成功'
              })
              this.goto('login')
            } else {
              this.$notify.error({
                title: '注册失败'
              })
            }
          })
        } else {
          console.log('registerForm invalid')
        }
      })
    }
  }
}
</script>

<style scoped>
.board {
  width: 40vw;
  margin: 10vh auto 0;
  text-align: left;
}

.title {
  font-size: 20px;
  margin-left: 10%;
}
</style>
