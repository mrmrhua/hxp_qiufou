package com.houxiaopang.service;

import com.houxiaopang.model.Demand;

/**
 * author robin on 2017/11/8.
 */

public interface DemandService {
    public Demand getDeamndByDemandId(Long id);

    public int updateByPrimaryKeySelective(Demand demand);

    public int updataEndMoneyByDemandId(Demand demand);

    public int addDemand(Demand demand);
}
