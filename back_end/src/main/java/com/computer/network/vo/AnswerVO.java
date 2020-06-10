package com.computer.network.vo;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnswerVO {
    private Integer id;
    private Integer paperId;
    private Integer questionId;
    private Integer questionType;
    private String createTime;
    private String answerContent;
}
