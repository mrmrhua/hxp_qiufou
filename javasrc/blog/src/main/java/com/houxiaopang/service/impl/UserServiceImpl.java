package com.houxiaopang.service.impl;

import com.houxiaopang.dao.UserMapper;
import com.houxiaopang.model.User;
import com.houxiaopang.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * author robin on 2017/11/8.
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    public UserMapper userMapper;

    @Override
    public User getUserById(Long id) {
        return userMapper.selectByPrimaryKey(id);
    }

    @Override
    public User getUserByUid(String uid) {
        return userMapper.selectByUid(uid);
    }

    @Override
    public int addUser(User user) {
        return userMapper.insert(user);
    }
}
