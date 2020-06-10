package com.computer.network.service;

import com.computer.network.vo.ResponseVO;
import com.computer.network.vo.UserVO;


public interface UserService {

    ResponseVO addUser(UserVO userVO);

    ResponseVO login(UserVO userVO);
}
