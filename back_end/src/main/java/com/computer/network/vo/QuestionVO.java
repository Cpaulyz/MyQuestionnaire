package com.computer.network.vo;

import com.computer.network.po.Options;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionVO {
    private Integer id;
    private Integer paperId;
    private Integer type;
    private String title;
    private List<Options> options;
}
