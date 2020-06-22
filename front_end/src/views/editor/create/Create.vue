<template>
  <div class="create">
    <div class="header">
      标题：<el-input
        type="text"
        placeholder="输入标题"
        v-model="paperInfo.title"
        style="max-width: 250px;"
        @blur="updatePaper()"
      />
    </div>

    <el-divider />

    <span>问卷说明：</span>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4 }"
      placeholder="请输入問卷說明"
      v-model="paperInfo.description"
      style="width: 800px; padding-right: 100px"
      @blur="updatePaper()"
    >
    </el-input>

    <el-divider />

    <div style="height: 50px; text-align: left; line-height: 50px">
      <el-radio v-model="radio" label="1" @change="toggleDatepicker(false)">手动结束收集</el-radio>
      <el-divider direction="vertical"/>
      <el-radio v-model="radio" label="2" @change="toggleDatepicker(true)">开始时间-结束时间</el-radio>
    </div>
    <div style="height: 30px; text-align: left; line-height: 30px; margin-bottom: 40px" v-if="datepicker">
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        v-if="datepicker"
        @change="changeDate()"
      >
      </el-date-picker>
    </div>

    <el-divider />

    <el-form>
      <el-form-item
        style="text-align: left"
        ref="questionList"
        label-width="100px"
        v-for="(ques, index) in questionList"
        :key="index"
      >
        <el-input
          type="textarea"
          placeholder="请输入問題"
          v-model="ques.title"
          style="width: 700px; border: 2px solid; display: block"
        >
        </el-input>
        <div v-if="ques.type === 1">
          <el-tag type="info" style="margin-top: 10px">单选题</el-tag>
          <el-button
            style="display: block; margin-top: 10px"
            type="primary"
            size="mini"
            icon="el-icon-plus"
            @click="addOption(ques)"
          >
            新增选项
          </el-button>
          <div
            style="padding-right: 600px; margin-top: 10px;"
            v-for="(option, index) in ques.options"
            :key="index"
          >
            <el-radio style="display: inline-block" disabled=""></el-radio>
            <el-input
              style="display: inline-block; width: 200px"
              v-model="option.content"
            ></el-input>
            <el-button
              type="danger"
              icon="el-icon-close"
              circle
              size="mini"
              style="margin-left: 5px"
              @click="removeOption(ques, index)"
            >
            </el-button>
          </div>
        </div>
        <div v-else-if="ques.type === 2">
          <el-tag type="info" style="margin-top: 10px">多选题</el-tag>
          <el-button
            style="display: block; margin-top: 10px"
            type="primary"
            size="mini"
            icon="el-icon-plus"
            @click="addOption(ques)"
          >
            新增选项
          </el-button>
          <div
            style="padding-right: 600px;"
            v-for="(option, index) in ques.options"
            :key="index"
          >
            <el-checkbox
              style="display: inline-block; margin-right: 10px"
              disabled=""
            ></el-checkbox>
            <el-input
              style="display: inline-block; width: 200px"
              v-model="option.content"
            ></el-input>
            <el-button
              type="danger"
              icon="el-icon-close"
              circle
              size="mini"
              style="margin-left: 5px"
              @click="removeOption(ques, index)"
            >
            </el-button>
          </div>
        </div>
        <div v-else>
          <div>
            <el-tag type="info" style="margin-top: 10px">简答题</el-tag>
          </div>
          <el-input
            type="textarea"
            placeholder="回答"
            style="display: block; width: 500px; margin:10px 0; padding-right: 400px;"
          >
          </el-input>
        </div>
        <div style="display: flex; justify-content: flex-end;">
          <el-button @click="delQues(index)" type="danger">删除</el-button>
          <el-button @click="updQues(index)" type="success">保存</el-button>
          <div style="flex: 0 1 20%"></div>
        </div>
        <el-divider />
      </el-form-item>
    </el-form>
    <!--<div style="margin-bottom: 30px; padding-left: 700px; padding-bottom: 30px">

    </div>-->
    <div style="padding-bottom: 20px">
      <el-button v-if="Listempty" type="success" @click="submitpaper()"
        >发放问卷 !</el-button
      >
      <el-divider v-if="Listempty" direction="vertical" />
      <el-dropdown @command="addQues">
        <el-button type="primary"
          >新增问题<i class="el-icon-arrow-down el-icon--right"></i
        ></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">单选</el-dropdown-item>
          <el-dropdown-item command="2" divided>多选</el-dropdown-item>
          <el-dropdown-item command="3" divided>简答</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Create',
  data() {
    return {
      datepicker: false,
      radio: '1',
      date: ''
    }
  },
  async mounted() {
    console.log('Create with paperInfo & questionList')
    const paperId = this.$route.params.paperId
    console.log(`paperId: ${paperId}`)
    await this.editOldPaper(paperId)
    console.log(this.paperInfo)
    console.log(this.questionList)
    // this.toggleDatepicker(false)
  },
  watch: {
    paperInfo() {
      console.log('paperInfo update')
      if(this.paperInfo.startTime != null) {
        this.datepicker = true
        this.radio = '2'
        this.date = [
          new Date(this.paperInfo.startTime),
          new Date(this.paperInfo.endTime)
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['paperInfo', 'questionList']),
    Listempty() {
      return this.questionList.length !== 0
    },
  },
  methods: {
    ...mapActions([
      'createQuestion',
      'updateQuestion',
      'deleteQuestion',
      'editOldPaper',
      'updatePaperInfo',
      'activatePaper'
    ]),
    changeDate() {
      console.log(this.date)
      const transfer = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`
      let startTime = transfer(this.date[0])
      let endTime = transfer(this.date[1])
      const newPaperInfo = {
        ...this.paperInfo,
        startTime,
        endTime
      }
      console.log(newPaperInfo)
      this.updatePaperInfo(newPaperInfo).then((res) => {
        if (!res) {
          this.$message.error('网路异常')
        }
      })
    },
    toggleDatepicker(bool) {
      this.datepicker = bool
      if(!bool) {
        this.date = null
        const newPaperInfo = {
          ...this.paperInfo,
          startTime: null,
          endTime: null
        }
        console.log(newPaperInfo)
        this.updatePaperInfo(newPaperInfo).then((res) => {
          if (!res) {
            this.$message.error('网路异常')
          }
        })
      }
    },
    updatePaper() {
      console.log('invoke updatePaper')
      console.log(this.paperInfo)
      this.updatePaperInfo(this.paperInfo).then((res) => {
        if (!res) {
          this.$message.error('网路异常')
        }
      })
    },
    addQues(type) {
      const paperId = this.paperInfo.id
      console.log(`addQuestion with paperId: ${paperId}`)
      const quesParam = {
        paperId,
        type: Number(type)
      }
      this.createQuestion(quesParam)
    },
    delQues(index) {
      const ques = this.questionList[index]
      const delQuesParam = {
        questionId: ques.id,
        index
      }
      this.deleteQuestion(delQuesParam).then((res) => {
        if (res) {
          this.$message.success('刪除成功')
        } else {
          this.$message.error('刪除失敗')
        }
      })
    },
    checkQues(ques) {
      if (ques.title === '') {
        this.$message.warning('題目描述不可為空')
        return false
      }
      if (ques.type <= 2) {
        if (ques.options.length < 2) {
          this.$message.warning('选择题至少要有两个选项')
          return false
        }
        // 检查选项
        for (let option of ques.options) {
          if (option.content.length === 0) {
            this.$message.warning('選項不可為空')
            return false
          }
        }
      }
      return true
    },
    updQues(index) {
      // console.log('index: ' + index)
      // console.log(this.questionList)
      const ques = this.questionList[index]
      console.log(`invoke updateQuesiton questionId: ${ques.id}`)
      // console.log(ques)
      if(!this.checkQues(ques)) {
        return
      }
      // console.log(ques)
      this.updateQuestion(ques).then((res) => {
        if (res) {
          this.$message.success('保存成功')
        } else {
          this.$message.error('保存失敗')
        }
      })
    },
    addOption(question) {
      question.options.push({ content: '' })
    },
    removeOption(question, index) {
      question.options.splice(index, 1)
    },
    submitpaper: async function() {
      console.log(`submitPaper with paperId: ${this.paperInfo.id}`)
      // 保存所有题目
      let i = 0
      for (let ques of this.questionList) {
        if (ques.title === '') {
          this.$message.warning(`问题 ${i} 題目描述不可為空`)
          return
        }
        if (ques.type <= 2) {
          if (ques.options.length < 2) {
            this.$message.warning(`问题 ${i} 选择题至少要有两个选项`)
            return
          }
          // 检查选项
          for (let option of ques.options) {
            if (option.content.length === 0) {
              this.$message.warning(`问题 ${i} 選項不可為空`)
              return
            }
          }
        }
        const res = await this.updateQuestion(ques)
        if (!res) {
          this.$message.error(`问题 ${i} 保存失敗`)
          return
        }
        i++
      }
      // 跟更新问卷状态
      const res = await this.activatePaper()
      console.log(res)
      if (res) {
        this.$message.success(`发放成功`)
        this.$router.push({
          name: 'paperlink',
          params: { paperId: this.paperInfo.id }
        })
      } else {
        this.$message.error(`发放问卷异常`)
      }
    }
  }
}
</script>

<style>
.header {
  height: 50px;
  padding: 0 20px;
  line-height: 47px;
  font-size: 20px;
  text-align: left;
}

.name {
  float: left;
  font-size: 20px;
}

.el-checkbox-group {
  padding-right: 700px;
}

.el-checkbox {
  display: block;
  margin: 10px;
}

.el-checkbox:last-of-type {
  margin: none;
}

.el-radio {
  margin: 0;
}
</style>
