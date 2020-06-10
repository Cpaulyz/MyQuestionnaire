package com.computer.network.service;

import com.computer.network.vo.QuestionVO;
import com.computer.network.vo.ResponseVO;

import java.util.List;

public interface QuestionService {

    ResponseVO addQuestion(Integer paperId);

    ResponseVO updateQuestion(QuestionVO questionVO);

    ResponseVO deleteQuestion(Integer questionId);
}
