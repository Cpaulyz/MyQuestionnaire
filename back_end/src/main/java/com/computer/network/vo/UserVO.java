package com.computer.network.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserVO {
    private Integer id;
    private String name;
    private String password;
}
