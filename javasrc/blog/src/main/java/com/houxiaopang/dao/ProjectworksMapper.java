package com.houxiaopang.dao;

import com.houxiaopang.model.Projectworks;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProjectworksMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Projectworks record);

    int insertSelective(Projectworks record);

    Projectworks selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Projectworks record);

    int updateByPrimaryKey(Projectworks record);

    List<Projectworks> findByPostId(Integer postId);

    List<Projectworks> findByPostIdWithUser(@Param("userId") Integer userId, @Param("postId") Integer postId);
}