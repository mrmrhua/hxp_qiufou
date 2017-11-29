package com.houxiaopang.dao;

import com.houxiaopang.model.Design;
import com.houxiaopang.util.PageBean;

import java.util.List;

/**
 * 设计点滴
 */
public interface DesignMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Design record);

    int insertSelective(Design record);

    Design selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Design record);

    int updateByPrimaryKeyWithBLOBs(Design record);

    int updateByPrimaryKey(Design record);

    List<Design> selectAll(PageBean pageBean);

    Integer getCount();

}