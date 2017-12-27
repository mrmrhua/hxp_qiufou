package com.houxiaopang.service.impl;

import com.houxiaopang.dao.SubscribtionMapper;
import com.houxiaopang.model.Subscribtion;
import com.houxiaopang.service.SubscribtionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * author robin on 2017/12/6.
 */
@Service
public class SubscribtionServiceImpl implements SubscribtionService {
    @Autowired
    SubscribtionMapper subscribtionMapper;

    @Override
    public int add(Subscribtion subscribtion) {
        return subscribtionMapper.insert(subscribtion);
    }
}
