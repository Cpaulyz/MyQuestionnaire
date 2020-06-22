<template>
  <el-container class="overview">
    <el-header height="30px">
      <span class="title" style="float: left; font-size: 30px; font-weight: 700"
        >问卷列表</span>
      <div>
        <el-button type="primary" style="float: right" @click="createPaper()"
          >新增问卷</el-button
        >
      </div>
    </el-header>
    <el-divider></el-divider>

    <el-main class="papers">
      <h1 v-if="allPapers.length === 0"> 无问卷信息，点击<span @click="createPaper()" style="cursor: pointer; color: blue;">新增问卷</span>！</h1>
      <div v-for="(paper, index) in allPapers" :key="paper.id" style="display:block">
        <el-card class="paper_card" style="margin-bottom:30px">
          <div slot="header" class="clearfix">
            <span style="margin-left: 5px">ID: {{ paper.id }}</span>
            <span style="margin-left: 5px">标题: {{ paper.title }}</span>
            <label v-if="paper.status === 'INIT'" style="float: right"
              >问卷状态：编辑中</label
            >
            <label v-else-if="paper.status === 'START'" style="float: right">
              问卷状态：已发放
            </label>
            <label v-else-if="paper.status === 'STOP'" style="float: right">
              问卷状态：已回收
            </label>
          </div>
          <el-button
            v-if="paper.status === 'INIT'"
            type="text"
            style="float: left"
            @click="editPaper(paper.id)"
            icon="el-icon-edit"
            >继续编辑</el-button
          >
          <el-button
            v-if="paper.status === 'START' || paper.status === 'STOP'"
            type="text"
            style="float: left"
            @click="checkPaperDetail(paper.id)"
            icon="el-icon-edit"
            >查看问卷</el-button
          >
          <el-button
            v-if="paper.status === 'START'"
            type="text"
            style="float: left"
            @click="handleShare(paper.id)"
            icon="el-icon-share"
            >发放链接</el-button
          >
          <el-button
            type="text"
            style="float: left"
            @click="showDeleteDialog(index)"
            icon="el-icon-delete"
            >删除问卷</el-button
          >
        </el-card>
      </div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>确认删除该问卷</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="danger" @click="handleDelete()"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Overview',
  data() {
    return {
      dialogVisible: false,
      userId: -1,
      deleteDialogInfo: {
        index: -1
      }
    }
  },
  mounted() {
    // console.log('mounted')
    this.getAllPapers()
  },
  computed: {
    ...mapGetters(['allPapers'])
  },
  methods: {
    ...mapActions(['getAllPapers', 'deletePaper', 'editOldPaper']),
    ...mapMutations(['set_createPaperVisible']),
    createPaper() {
      // console.log(this.set_createPaperVisible)
      this.set_createPaperVisible(true)
    },
    checkPaperDetail(paperId) {
      console.log(`check paper detail with paperId: ${paperId}`)
      this.$router.push({ name: 'monitor', params: { paperId } })
    },
    handleShare(paperId) {
      this.$router.push({ name: 'paperlink', params: { paperId } })
    },
    editPaper(paperId) {
      this.editOldPaper(paperId).then(res => {
        if(res) {
          this.$router.push(`/editor/create/${paperId}`)
        } else {
          this.$notify.success({
            title: '异常问卷，请询问管理员'
          })
        }
      })
    },
    handleDelete() {
      const index = this.deleteDialogInfo.index
      console.log(`delete paper with index: ${index}`)
      console.log(this.allPapers[index])
      this.deletePaper(index).then(res => {
        if(res) {
          this.$notify.success({
            title: '删除成功'
          })
        } else {
          this.$notify.error({
            title: '删除失败'
          })
        }
      })
      this.dialogVisible = false
    },
    showDeleteDialog(index) {
      this.deleteDialogInfo.index = index
      this.dialogVisible = true
    }
  }
}
</script>

<style>
.paper_card {
  width: 100%;
}
</style>
