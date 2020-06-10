package com.computer.network.controller;

import com.computer.network.service.AnswerService;
import com.computer.network.vo.AnswerVO;
import com.computer.network.vo.ResponseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/answer")
public class AnswerController {

    @Autowired
    AnswerService answerService;

    @PostMapping("/addAnswers")
    public ResponseVO addAnswers(@RequestBody List<AnswerVO> answerVOList){
        return answerService.addAnswers(answerVOList);
    }
}
