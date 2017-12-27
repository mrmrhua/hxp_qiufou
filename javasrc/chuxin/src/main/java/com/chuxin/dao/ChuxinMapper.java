package com.chuxin.dao;

import com.chuxin.model.Chuxin;

public interface ChuxinMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Chuxin record);

    int insertSelective(Chuxin record);

    Chuxin selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Chuxin record);

    int updateByPrimaryKey(Chuxin record);
}