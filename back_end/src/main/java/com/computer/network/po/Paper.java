package com.computer.network.po;

import com.computer.network.enums.PaperStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Paper {
    private Integer id;
    private Integer userId;
    private String title;
    private String description;
    private String startTime;
    private String endTime;
    private PaperStatus status;
}
