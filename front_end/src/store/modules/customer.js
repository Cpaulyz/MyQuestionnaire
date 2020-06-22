import { reviewPaperAPI, checkPaperAPI, updatePaperAPI } from '../../api/paper/paper'
import { addAnswersAPI, reviewAnswersAPI } from '../../api/customer/answer'

const paper = {
  state: {
    paper: {}, /* Paper */
    paperStatistic: {},
    answers: []
  },
  mutations: {
    set_paper(state, paper) {
      state.paper = paper
    },
    set_paperStatistic(state,paperStatistic){
      state.paperStatistic = paperStatistic
    },
    set_answers(state, answers) {
      state.answers = answers
    }
  },
  actions: {
    getFullPaper: async({ commit }, paperId) => {
      console.log(`get paper ${paperId}`)
      const res = await checkPaperAPI(paperId)
      if(res && res.data.success) {
        const paper = res.data.content
        console.log(paper)
        // fill answers
        for(let question of paper.questionList) {
          if(question.type === 2) {
            question.answer = []
          } else {
            question.answer = ''
          }
        }
        commit('set_paper', paper)
        return true
      } else {
        return false
      }
    },
    getFullPaperStatistic: async({commit},paperId) =>{
      console.log(`get paperStatistic with paperId: ${paperId}`)
      const res = await reviewPaperAPI(paperId)
      console.log(res)
      if(res && res.data.success) {
        const paperStatistic = res.data.content
        for(let question of paperStatistic.questionStatistics) {
          if(question.type === 3) {
            continue
          }
          const total = question.filledInNum
          for(let option of question.optionStatistics) {
            option.percent = (Math.floor(option.selectedNum / total * 1000) / 10) + '%'
          }
        }
        console.log(paperStatistic)
        commit('set_paperStatistic',paperStatistic)
        return true
      } else {
        return false
      }
    },
    getAnswersRow: async({ commit }, paperId) => {
      console.log(`getAnswerRow with paperId: ${paperId}`)
      const res = await reviewAnswersAPI(paperId)
      if(res && res.data.success) {
        const answerRows = res.data.content
        const answers = {
          questions: answerRows[0].length - 1,
          rows: []
        }
        for(let row of answerRows) {
          const record = {}
          record.date = row[0]
          for(let i=1, end=row.length ; i<end; i++) {
            record['q' + i] = row[i]
          }
          answers.rows.push(record)
        }
        console.log('get answers')
        console.log(answers)
        commit('set_answers', answers)
        return true
      } else {
        return false
      }
    },
    terminateCollection: async(_, paper) => {
      const paperInfo = { ...paper }
      paper.status = paperInfo.status = "STOP"
      const res = await updatePaperAPI(paperInfo)
      // console.log(res)
      console.log(paper)
      return res && res.data.success
    },
    restartCollection: async({ commit, getters }, date) => {
      const mp = getters.monitorPaper
      let newPaperInfo = {
        ...mp,
      }
      if(date) {
        const transfer = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`
        const startTime = transfer(date[0])
        const endTime = transfer(date[1])
        mp.startTime = newPaperInfo.startTime = startTime
        mp.endTime = newPaperInfo.endTime = endTime

        const startT = Date.parse(startTime)
        const endT = Date.parse(endTime)
        const current = new Date().valueOf()
        if(endT <= current) {
          mp.status = newPaperInfo.status = "STOP"
        } else if(current >= startT && current <= endT) {
          mp.status = newPaperInfo.status = "START"
        } else {
          mp.status = newPaperInfo.status = "INIT"
        }
      } else {
        mp.startTime = newPaperInfo.startTime = null
        mp.endTime = newPaperInfo.endTime = null
        mp.status = newPaperInfo.status = "START"
      }
      console.log(newPaperInfo)
      const res = await updatePaperAPI(newPaperInfo)
      if(res && res.data.success) {
        commit('set_paperStatistic',newPaperInfo)
        return true
      } else {
        return false
      }
    },
    submitAnswers: async(_, answers) => {
      console.log('submit answers in actions')
      const res = await addAnswersAPI(answers)
      console.log(res)
      return res && res.data.success
    }
  }
}

export default paper