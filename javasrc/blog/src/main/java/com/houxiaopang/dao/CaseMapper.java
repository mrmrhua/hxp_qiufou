package com.houxiaopang.dao;

import com.houxiaopang.model.Case;
import com.houxiaopang.util.PageBean;

import java.util.List;

public interface CaseMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Case record);

    int insertSelective(Case record);

    Case selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Case record);

    int updateByPrimaryKeyWithBLOBs(Case record);

    int updateByPrimaryKey(Case record);

    List<Case> selectAll(PageBean pageBean);

    Integer getCount();
}