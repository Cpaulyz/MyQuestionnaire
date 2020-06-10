package com.computer.network.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OptionsVO {
    private Integer questionId;
    private Integer sequence;      //在这个问题中是第几个选项
    private String content;
}