package com.houxiaopang.dao;

import com.houxiaopang.model.Designers;
import com.houxiaopang.model.DesignersWithBLOBs;
import org.apache.ibatis.annotations.Param;

public interface DesignersMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(DesignersWithBLOBs record);

    int insertSelective(DesignersWithBLOBs record);

    DesignersWithBLOBs selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(DesignersWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(DesignersWithBLOBs record);

    int updateByPrimaryKey(Designers record);

    int updataVerifiedByUserId(@Param("userId") Integer userId, @Param("status") Boolean status);

}