<template>
  <el-container class="editor">
    <el-header>
      <div class="editor-header">
        <span style="float: left; font-size: 30px">
          <i class="el-icon-edit"></i>
          My Questionnaire
        </span>
        <span style="float: right;font-size: 30px; cursor: pointer" @click="logout()">登出</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu @select="handleMenuSelect" default-active="overview">
          <el-menu-item index="overview">
            <i class="el-icon-coin"></i>
            <span>问卷总览</span>
          </el-menu-item>
          <el-menu-item index="create">
            <i class="el-icon-plus"></i>
            <span>新建问卷</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
        <CreatePaper></CreatePaper>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CreatePaper from './create/CreatePaper'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Editor',
  components: {
    CreatePaper
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    ...mapMutations([
      'set_createPaperVisible',
      'set_loginState',
      'set_userInfo'
    ]),
    ...mapActions(['logoutAct']),
    handleMenuSelect(index) {
      if (index === 'overview') {
        const route = this.$route.path
        if (route !== '/editor/overview') {
          this.$router.push({ name: index })
        }
      } else if (index === 'create') {
        this.set_createPaperVisible(true)
      }
    },
    logout() {
      console.log('logout')
      this.logoutAct().then(res => {
        if(res) {
          this.$router.go({ name: 'login' })
        }
      })
      // this.$router.push('/login')
    }
  }
}
</script>

<style>
* {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.editor {
  height: 100%;
}

.editor-header {
  height: 100%;
  padding: 10px 40px;
}
</style>
