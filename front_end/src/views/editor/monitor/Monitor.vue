<template>
  <div class="monitor">
    <el-container>
      <el-header height="30px">
        <div
          class="title"
          style="float: left; font-size: 30px; font-weight: 700"
        >
          统计&分析 -- {{ monitorPaper.title }}
        </div>
      </el-header>
      <el-divider></el-divider>
      <el-main>
        <div class="analyzeTables" :model="monitorPaper">
          <div style="text-align: left; margin: 5px 0">
            <span style="font-size: 20px; font-weight: 450"
              >问卷状态：{{
                { INIT: '编辑中', START: '已发放', STOP: '已回收' }[
                  monitorPaper.status
                ]
              }}</span
            >
          </div>
          <div style="text-align: left; margin: 5px 0">
            <span
              style="font-size: 20px; font-weight: 450"
              v-if="monitorPaper.endTime != null"
            >
            发放时段：{{ monitorPaper.startTime }} 到 {{ monitorPaper.endTime }}
            </span>
            <span style="font-size: 20px; font-weight: 450" v-else>
              发放时段：人工操作
            </span>
          </div>
          <div style="text-align: left">
            <el-button
              v-if="monitorPaper.status === 'START'"
              type="danger"
              @click="endCollection()"
              >结束收集</el-button
            >
            <el-button
              v-if="monitorPaper.status === 'STOP' || monitorPaper.status === 'INIT'"
              type="warning"
              @click="showResetModal = true"
            >重新发放</el-button>
            <el-dialog title="设定收集时间" :visible.sync="showResetModal">
              <div style="height: 50px; text-align: left; line-height: 50px">
                <el-radio v-model="radio" label="1">手动结束收集</el-radio>
                <el-divider direction="vertical" />
                <el-radio v-model="radio" label="2">开始时间-结束时间</el-radio>
              </div>
              <div
                style="height: 30px; text-align: left; line-height: 30px; margin-bottom: 40px"
                v-if="datepicker"
              >
                <el-date-picker
                  v-model="date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  v-if="datepicker"
                >
                </el-date-picker>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="showResetModal = false">取 消</el-button>
                <el-button type="primary" @click="resetCollection()"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </div>
          <div style="text-align: left; margin-top: 10px;">
            <el-button type="primary" @click="answersVisible = true">查看填写记录</el-button>
          </div>
          <el-dialog top="10vh" width="70%" :visible.sync="answersVisible">
            <span slot="title" style="font-size: 25px; font-weight: 450">问卷填写记录</span>
            <el-table :data="answers.rows" max-height="600px" stripe="">
              <el-table-column property="date" label="填写时间" width="200"></el-table-column>
              <el-table-column v-for="(ques, j) in monitorPaper.questionStatistics" :key="j" :property="'q'+(j+1)" :label="'第'+(j+1)+'题'+ques.title" min-width="300"></el-table-column>
            </el-table>
          </el-dialog>
          <div
            v-for="(question, index) in monitorPaper.questionStatistics"
            :key="question.id"
          >
            <h1 class="qusetionTitle" style="font-size: 20px; font-weight: 700">
              第{{ index + 1 }}题--{{ question.title }}
            </h1>
            <el-tag style="color:rgb(37,124,115);margin-bottom:10px;float:left"
              >填写总数：{{ question.filledInNum }}</el-tag
            >
            <el-table
              v-if="question.type === 1 || question.type == 2"
              :data="question.optionStatistics"
              border
              stripe
              style="width:100%; margin-bottom: 10px"
            >
              <el-table-column
                prop="sequence"
                label="选项"
                sortable
              ></el-table-column>
              <el-table-column prop="content" label="选项描述">
                <template slot-scope="scope">
                  <span style="center">{{
                    scope.row[scope.column.property]
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="selectedNum"
                label="选择人数"
                sortable
              ></el-table-column>
              <el-table-column prop="percent" label="比例"> </el-table-column>
            </el-table>

            <el-table
              v-if="question.type === 3"
              :data="question.answerVOList"
              border
              stripe
              style="width: 100%;margin-bottom: 40px"
            >
              <el-table-column
                label="序号"
                type="index"
                width="100"
              ></el-table-column>
              <el-table-column
                label="答案文本"
                prop="answerContent"
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Monitor',
  data() {
    return {
      showResetModal: false,
      // datepicker: false,
      answersVisible: false,
      radio: '1',
      date: ''
    }
  },
  async mounted() {
    const paperId = this.$route.params.paperId
    let res = await this.getFullPaperStatistic(paperId)
    if (!res) {
      this.$message.error('问卷统计加载失败，请询问管理员')
      return
    }
    res = await this.getAnswersRow(paperId)
    console.log(this.answers)
  },
  computed: {
    ...mapGetters(['monitorPaper', 'answers']),
    datepicker() {
      return this.radio === '2'
    },
  },
  methods: {
    ...mapActions([
      'getFullPaperStatistic',
      'terminateCollection',
      'restartCollection',
      'getAnswersRow'
    ]),
    endCollection() {
      this.$confirm('确定结束此问卷收集？', '结束收集', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.terminateCollection(this.monitorPaper).then((res) => {
            this.$message({
              type: 'warning',
              message: '问卷收集结束！'
            })
          })
        })
        .catch(() => {})
    },
    resetCollection() {
      const date = this.datepicker ? this.date : null
      console.log(`date: ${date}`)
      this.restartCollection(date).then((res) => {
        if (res) {
          this.$message.success('重新发放成功')
          console.log(this.monitorPaper)
        } else {
          this.$message.error('发放失败')
        }
      })
      this.showResetModal = false
    }
  }
}
</script>

<style>
.questionTitle {
  margin-left: 5px;
  display: inline-block;
}
</style>
