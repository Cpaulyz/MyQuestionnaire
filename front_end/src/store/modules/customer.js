import { reviewPaperAPI, checkPaperAPI, updatePaperAPI } from '../../api/paper/paper'
import { addAnswersAPI } from '../../api/customer/answer'

const paper = {
  state: {
    paper: {}, /* Paper */
    paperStatistic: {}
  },
  mutations: {
    set_paper(state, paper) {
      state.paper = paper
    },
    set_paperStatistic(state,paperStatistic){
      state.paperStatistic = paperStatistic
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
      // const paper = {
      //   title: '问卷标题，大概最多会有20个字（。。。）',
      //   description: '一个大概会有30～50个字的说明一个大概会有30～50个字的说明一个大概会有30～50个字的说明一个大概会有30～50个字的说明一个大概会有30～50个字的说明一个大概会有30～50个字的说明一个大概会有30～50个字的说明一个大概会有30～50个字的说明一个大概会有30～50个字的说明',
      //   questionList: [
      //     {
      //       id: 1,
      //       type: 1,
      //       title: '单选题一',
      //       options: [
      //         {
      //           id: 1,
      //           questionId: 1,
      //           content: '单选选项一'
      //         },
      //         {
      //           id: 2,
      //           questionId: 1,
      //           content: '单选选项二'
      //         },
      //         {
      //           id: 3,
      //           questionId: 1,
      //           content: '单选选项三'
      //         },
      //       ],
      //     },
      //     {
      //       id: 2,
      //       type: 2,
      //       title: '多选题一',
      //       options: [
      //         {
      //           id: 4,
      //           questionId: 2,
      //           content: '多选选项一'
      //         },
      //         {
      //           id: 5,
      //           questionId: 2,
      //           content: '多选选项二'
      //         },
      //         {
      //           id: 6,
      //           questionId: 2,
      //           content: '多选选项三'
      //         },
      //         {
      //           id: 7,
      //           questionId: 2,
      //           content: '多选选项4'
      //         },
      //         {
      //           id: 8,
      //           questionId: 2,
      //           content: '多选选项5'
      //         },
      //         {
      //           id: 9,
      //           questionId: 2,
      //           content: '多选选项6'
      //         },
      //       ],
      //     },
      //     {
      //       id: 3,
      //       type: 3,
      //       title: '简答',
      //     },
      //   ],
      // }

      // console.log('get paper in actions')
      // console.log(paper)
    },
    getFullPaperStatistic: async({commit},paperId) =>{
      console.log(`get paperStatistic with paperId: ${paperId}`)
      const res = await reviewPaperAPI(paperId)
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
      // console.log(res)
      // const paperStatistic = {
      //   title: '问卷标题question',
      //   description: '问卷一',
      //   questionStatisticList: [
      //     {
      //       id: 1,
      //       type: 1,
      //       title: '单选题一',
      //       selectNum:23,
      //       options: [
      //         {
      //           id: 1,
      //           questionId: 1,
      //           content: '单选选项一',
      //           selectNum: 5,
      //           percent: '22%'
      //         },
      //         {
      //           id: 2,
      //           questionId: 1,
      //           content: '单选选项二',
      //           selectNum: 8,
      //           percent: '35%'
      //         },
      //         {
      //           id: 3,
      //           questionId: 1,
      //           content: '单选选项三',
      //           selectNum: 10,
      //           percent: '43%'
      //         },
      //       ],
      //     },
      //     {
      //       id: 2,
      //       type: 2,
      //       title: '多选题一',
      //       selectNum:23,
      //       options: [
      //         {
      //           id: 4,
      //           questionId: 2,
      //           content: '多选选项一',
      //           selectNum: 10,
      //           percent: '43%'
      //         },
      //         {
      //           id: 5,
      //           questionId: 2,
      //           content: '多选选项二',
      //           selectNum: 8,
      //           percent: '38%'
      //         },
      //         {
      //           id: 6,
      //           questionId: 2,
      //           content: '多选选项三',
      //           selectNum: 19,
      //           percent: '83%'
      //         },
      //         {
      //           id: 7,
      //           questionId: 2,
      //           content: '多选选项4',
      //           selectNum: 12,
      //           percent: '52%'
      //         },
      //         {
      //           id: 8,
      //           questionId: 2,
      //           content: '多选选项5',
      //           selectNum: 20,
      //           percent: '87%'
      //         },
      //         {
      //           id: 9,
      //           questionId: 2,
      //           content: '多选选项6',
      //           selectNum: 5,
      //           percent: '22%'
      //         },
      //       ],
      //     },
      //     {
      //       id: 3,
      //       type: 3,
      //       title: '简答',
      //       selectNum:3,
      //       options:[{
      //         id:1,
      //         content:"今天天气不错"
      //       },
      //       {
      //         id:2,
      //         content:"今天天气真好"
      //       },
      //       {
      //         id:3,
      //         content:"啊哈哈哈哈哈"
      //       }
      //       ]
      //     },
      //   ],
      // }
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