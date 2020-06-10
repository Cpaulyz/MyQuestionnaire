package com.computer.network.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionStatistic {
    private Integer id;
    private Integer paperId;
    private Integer type;
    private String title;
    private Integer filledInNum;    //此题填写人数
    private List<OptionStatistic> optionStatistics;   //选择题所有属性 简答题此属性为null
    private List<AnswerVO> answerVOList;    //简单题的所有answer 选择题此属性为null
}
