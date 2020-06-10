package com.computer.network.mapper;

import com.computer.network.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository   //@Mapper已经包括这个了，但是不显示加上的话容器内就没有，serviceImpl就没法自动注入，就有红线，就很难受
public interface UserMapper {

    int addUser(UserVO userVO);

    UserVO getUserByName(String name);
}
