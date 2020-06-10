package com.computer.network.vo;

import com.computer.network.enums.PaperStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaperStatistic {
    private Integer id;
    private Integer userId;
    private String title;
    private String description;
    private String startTime;
    private String endTime;
    private PaperStatus status;
    private List<QuestionStatistic> questionStatistics;
}
