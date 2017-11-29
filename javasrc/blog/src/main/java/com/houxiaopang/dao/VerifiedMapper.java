package com.houxiaopang.dao;

import com.houxiaopang.model.Verified;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface VerifiedMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Verified record);

    int insertSelective(Verified record);

    Verified selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Verified record);

    int updateByPrimaryKey(Verified record);

    Verified selectByUserId(Integer userId);

    int updataStatusByUserId(@Param("id") Integer userId, @Param("status") Integer status);

    List<Verified> selectAll();

    int updataAllByUserId(Verified verified);
}