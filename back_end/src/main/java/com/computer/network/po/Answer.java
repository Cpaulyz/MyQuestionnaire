package com.computer.network.po;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class Answer {
    private Integer id;
    private Integer paperId;
    private Integer questionId;
    private Integer questionType;
    private String createTime;
    private String answerContent;
}