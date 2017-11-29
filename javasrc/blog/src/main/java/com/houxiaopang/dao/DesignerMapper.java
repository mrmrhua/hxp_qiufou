package com.houxiaopang.dao;

import com.houxiaopang.model.Designer;
import org.apache.ibatis.annotations.Param;

/**
 * 设计师
 */
public interface DesignerMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Designer record);

    int insertSelective(Designer record);

    Designer selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Designer record);

    int updateByPrimaryKeyWithBLOBs(Designer record);

    int updateByPrimaryKey(Designer record);

    int updataVerifiedByUserId(@Param("userId") Integer userId,@Param("status") Boolean status);
}