package com.houxiaopang.dao;

import com.houxiaopang.model.Subscribtion;
import com.houxiaopang.model.SubscribtionKey;

public interface SubscribtionMapper {
    int deleteByPrimaryKey(SubscribtionKey key);

    int insert(Subscribtion record);

    int insertSelective(Subscribtion record);

    Subscribtion selectByPrimaryKey(SubscribtionKey key);

    int updateByPrimaryKeySelective(Subscribtion record);

    int updateByPrimaryKey(Subscribtion record);
}