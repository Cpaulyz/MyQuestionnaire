package com.computer.network.controller;

import com.computer.network.service.UserService;
import com.computer.network.vo.ResponseVO;
import com.computer.network.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseVO addUser(@RequestBody UserVO userVO){
        return userService.addUser(userVO);
    }

    @PostMapping("/login")
    public ResponseVO login(@RequestBody UserVO userVO){
        return userService.login(userVO);
    }
}
