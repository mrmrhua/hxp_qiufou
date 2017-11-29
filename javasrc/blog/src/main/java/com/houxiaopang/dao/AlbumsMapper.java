package com.houxiaopang.dao;

import com.houxiaopang.model.Albums;

import java.util.List;

public interface AlbumsMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Albums record);

    int insertSelective(Albums record);

    Albums selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Albums record);

    int updateByPrimaryKeyWithBLOBs(Albums record);

    int updateByPrimaryKey(Albums record);

    int insertList(List<Albums> albums);
}