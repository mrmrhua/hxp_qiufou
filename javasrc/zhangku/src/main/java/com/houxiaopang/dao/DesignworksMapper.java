package com.houxiaopang.dao;

import com.houxiaopang.pojo.Designworks;
import sun.security.krb5.internal.crypto.Des;

import java.util.List;

public interface DesignworksMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Designworks record);

    int insertSelective(Designworks record);

    Designworks selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Designworks record);

    int updateByPrimaryKey(Designworks record);

    int insertList(List<Designworks> designworks);
}