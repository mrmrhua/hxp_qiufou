package com.houxiaopang.dao;

import com.houxiaopang.model.Demand;

public interface DemandMapper {

    int deleteByPrimaryKey(Long id);


    int insert(Demand record);


    int insertSelective(Demand record);

    Demand selectByPrimaryKey(Long id);

    Demand selectByDemandId(Long id);

    int updateByPrimaryKeySelective(Demand record);

    int updateByPrimaryKey(Demand record);

    int updataEndMoneyByDemandId(Demand demand);
}