package com.computer.network.service;

import com.computer.network.vo.AnswerVO;
import com.computer.network.vo.ResponseVO;

import java.util.List;

public interface AnswerService {
    ResponseVO addAnswers(List<AnswerVO> answerVOList);
}
