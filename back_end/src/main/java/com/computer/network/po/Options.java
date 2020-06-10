package com.computer.network.po;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Options {    //这里叫options是因为option是mysql保留关键字，没办法，很烦，看着很难受
    private Integer questionId;
    private Integer sequence;
    private String content;
}

