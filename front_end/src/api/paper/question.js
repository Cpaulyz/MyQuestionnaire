import axios from 'axios'

const api = {
    questionPre: '/api/question'
}

// 添加问题
export function addQuestionsAPI(paperId) {
    return axios({
        url: `${api.questionPre}/${paperId}/addQuestion`,
        method: 'GET',
    })
}

// 更新问题
export function updateQuestionAPI(data) {
    return axios({
        url: `${api.questionPre}/updateQuestion`,
        method: 'POST',
        data
    })
}

// 删除问题
export function deleteQuestionAPI(questionId) {
    return axios({
        url: `${api.questionPre}/${questionId}/deleteQuestion`,
        method: 'GET',
    })
}
