package com.houxiaopang.service;

import com.houxiaopang.model.User;


/**
 * author robin on 2017/11/8.
 */

public interface UserService {
    public User getUserById(Long id);

    public User getUserByUid(String uid);

    public int addUser(User user);
}
