import {
  getUserPapersAPI,
  checkPaperAPI,
  reviewPaperAPI,
  addPaperAPI,
  updatePaperAPI,
  deletePaperAPI
} from '../../api/paper/paper'

import {
  addQuestionsAPI,
  updateQuestionAPI,
  deleteQuestionAPI
} from '../../api/paper/question'

const paper = {
  state: {
    paperList: [] /* Paper[] */,
    currentPaper: {
      paperInfo: {} /* Paper */,
      questionList: [
        /* Question[] */
        // {
        //   type: 1, // 單擇
        //   text: '',
        //   options: [
        //     {
        //       content: ''
        //     }
        //   ]
        // },
        // {
        //   type: 3, // 文字
        //   text: '',
        //   answer: ''
        // },
        // {
        //   type: 2, // 多選
        //   text: '',
        //   options: [
        //     {
        //       content: ''
        //     }
        //   ]
        // },
        // {
        //   type: 3,
        //   text: '',
        //   answer: ''
        // }
      ]
    },
    createPaperVisible: false // show createPaper Component
  },
  mutations: {
    set_paperList(state, paperList) {
      state.paperList = paperList
    },
    set_paperInfo(state, paperInfo) {
      state.currentPaper.paperInfo = paperInfo
    },
    set_questionList(state, questionList) {
      state.currentPaper.questionList = questionList
    },
    add_question(state, question) {
      state.currentPaper.questionList.push(question)
    },
    set_createPaperVisible(state, bool) {
      state.createPaperVisible = bool
    }
  },
  actions: {
    // 查看用户所有问卷
    getAllPapers: async ({ commit, getters }) => {
      const userId = getters.userInfo.id
      console.log(`get paperList with userId: ${userId}`)
      const res = await getUserPapersAPI(userId)
      // const res = {
      //   data: {
      //     success: true,
      //     content: [
      //       {
      //         paperInfo: {
      //           id: '123',
      //           userId: userId,
      //           title: '问卷一',
      //           description: '',
      //           start_time: '5月12日',
      //           end_time: null,
      //           status: 1
      //         },
      //         questionList: []
      //       },
      //       {
      //         paperInfo: {
      //           id: '128',
      //           userId: userId,
      //           title: '问卷二',
      //           description: '',
      //           start_time: '5月18日',
      //           end_time: null,
      //           status: 2
      //         },
      //         questionList: []
      //       },
      //       {
      //         paperInfo: {
      //           id: '1289',
      //           userId: userId,
      //           title: '问卷三',
      //           description: '',
      //           start_time: '5月29日',
      //           end_time: null,
      //           status: 1
      //         },
      //         questionList: []
      //       }
      //     ]
      //   }
      // }
      if(res && res.data.success) {
        const paperList = res.data.content
        console.log(paperList)
        commit('set_paperList', paperList)
      }
    },
    // 创建问卷
    createNewPaper: async ({ commit, getters }, paperParam /* Paper */) => {
      const paperForm = {
        userId: getters.userInfo.id,
        status: 'INIT',
        ...paperParam
      }
      const res = await addPaperAPI(paperForm)
      // console.log(res)
      if(!(res && res.data.success)) {
        return false
      }
      const paperInfo = res.data.content
      // console.log(paperInfo)
      // const paperInfo = {
      //   id: Math.floor(Math.random() * 100),
      //   userId: getters.userInfo.id,
      //   title: '',
      //   description: '',
      //   start_time: null,
      //   end_time: null,
      //   status: 1,
      //   ...paper
      // }
      // console.log(paperInfo)
      commit('set_paperInfo', paperInfo)
      commit('set_questionList', [])
      return paperInfo.id
    },
    // 继续编辑已有问卷
    editOldPaper: async ({ commit }, paperId) => {
      const res = await checkPaperAPI(paperId)
      // console.log(res)
      if(res && res.data.success) {
        const paperInfo = res.data.content
        const questionList = paperInfo.questionList
        paperInfo.questionList = undefined
        for(let question of questionList) {
          if(question.type == null) {
            question.type = 3
          }
        }
        commit('set_paperInfo', paperInfo)
        commit('set_questionList', questionList)
        return true
      } else {
        return false
      }
    },
    updatePaperInfo: async({ commit }, paperInfo) => {
      const res = await updatePaperAPI(paperInfo)
      if(res && res.data.success) {
        commit('set_paperInfo', paperInfo)
        return true
      } else {
        return false
      }
    },
    deletePaper: async({ state }, index) => {
      const targetPaper = state.paperList[index]
      const res = await deletePaperAPI(targetPaper.id)
      // console.log(res)
      // const res = {
      //   data: {
      //     success: true
      //   }
      // }
      if(res && res.data.success) {
        // console.log(targetPaper)
        // console.log(index)
        state.paperList.splice(index, 1)
        // const paperList =  [...state.paperList]
        // commit('set_paperList', paperList)
        return true
      } else {
        return false
      }
      
    },
    activatePaper: async({ getters }) => {
      const paperInfo = getters.paperInfo
      console.log(paperInfo)
      if(paperInfo.startTime == null) {
        paperInfo.status = "START"
      }
      console.log(paperInfo)
      const res = await updatePaperAPI(paperInfo)
      return res && res.data.success
    },
    // 创建问题
    createQuestion: async ({ commit }, quesParam) => {
      const res = await addQuestionsAPI(quesParam.paperId)
      const questionId = res.data.content
      //const questionId = 1
      let newQues = {
        id: questionId,
        ...quesParam,
        title: '',
        options: []
      }
      if (newQues.type <= 2) {
        // 是單選或多選才有選項
        newQues.options = [
          {
            content: ''
          }
        ]
      }
      commit('add_question', newQues)
      console.log(newQues)
    },
    // 更新问题
    updateQuestion: async (_, ques) => {
      const questionId = ques.id
      const options = ques.options
      for(let index in options) {
        options[index].questionId = questionId
        options[index].sequence = Number(index) + 1
      }
      console.log(ques)
      const res = await updateQuestionAPI(ques)
      //console.log(ques)
      /*const res = {
        data: {
          success: false,
          message: '',
          content: ''
        }
      }*/
      return res && res.data.success
    },
    // 删除问题
    deleteQuestion: async ({ state }, delQuesParam) => {
      const res = await deleteQuestionAPI(delQuesParam.questionId)
      if(res && res.data.success) {
        const questionList = state.currentPaper.questionList
        questionList.splice(delQuesParam.index, 1)
        return true
      } else {
        return false
      }
    }
  }
}

export default paper
