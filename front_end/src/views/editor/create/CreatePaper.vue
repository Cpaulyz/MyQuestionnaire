<template>
  <el-dialog
    title="新增问卷"
    :visible="createPaperVisible"
    :before-close="handleClose"
    @close="close()"
    width="30%"
  >
    <div class="questionnaire-name">
      问卷名称：
      <el-input v-model="title"> </el-input>
    </div>
    <div class="questonnaire-explain">
      问卷说明：
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        v-model="description"
      ></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="reset()" style="float: left">重 置</el-button>
      <el-button @click="set_createPaperVisible(false)">取 消</el-button>
      <el-button type="success" @click="createPaper()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'CreatePaper',
  computed: {
    ...mapGetters(['createPaperVisible'])
  },
  data() {
    return {
      title: '',
      description: '',
      dialogVisible: false
    }
  },
  methods: {
    ...mapMutations([
      'set_createPaperVisible',
    ]),
    ...mapActions([
      'createNewPaper'
    ]),
    createPaper() {
      if(this.title === '') {
        this.$message.error('请填上标题')
        return
      }
      const paperInfo = {
        title: this.title,
        description: this.description
      }
      // console.log(paperInfo)
      this.createNewPaper(paperInfo)
      if (this.$route.path !== '/editor/create') {
        this.$router.push('/editor/create')
      }
      this.set_createPaperVisible(false)
    },
    handleClose(done) {
      this.$confirm('确认关闭?')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    close() {
      // console.log(close)
      this.set_createPaperVisible(false)
    },
    reset() {
      this.title = ''
      this.description = ''
    }
  }
}
</script>

<style>
.questonnaire-explain {
  margin-top: 30px;
}
</style>
