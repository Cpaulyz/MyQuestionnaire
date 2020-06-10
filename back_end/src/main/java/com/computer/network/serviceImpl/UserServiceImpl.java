package com.computer.network.serviceImpl;

import com.computer.network.mapper.UserMapper;
import com.computer.network.service.UserService;
import com.computer.network.vo.ResponseVO;
import com.computer.network.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final static String ACCOUNT_EXIST = "账号已存在";
    private final static String ACCOUNT_INFO_ERROR = "用户名或密码错误";
    @Autowired
    UserMapper userMapper;

    @Override
    public ResponseVO addUser(UserVO userVO) {
        try {
            userMapper.addUser(userVO);
            return ResponseVO.buildSuccess();
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseVO.buildFailure(ACCOUNT_EXIST);
        }
    }

    @Override
    public ResponseVO login(UserVO userVO) {
        UserVO foundUser=userMapper.getUserByName(userVO.getName());
        if(foundUser==null || !foundUser.getPassword().equals(userVO.getPassword()))
            return ResponseVO.buildFailure(ACCOUNT_INFO_ERROR);
        return ResponseVO.buildSuccess(foundUser);
    }
}
