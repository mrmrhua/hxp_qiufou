package com.houxiaopang.dao;

import com.houxiaopang.model.Comments;
import com.houxiaopang.model.CommentsWithBLOBs;

import java.util.List;

public interface CommentsMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(CommentsWithBLOBs record);

    int insertSelective(CommentsWithBLOBs record);

    CommentsWithBLOBs selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(CommentsWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(CommentsWithBLOBs record);

    int updateByPrimaryKey(Comments record);

    List<CommentsWithBLOBs> selectByImageId(Integer imageId);
}