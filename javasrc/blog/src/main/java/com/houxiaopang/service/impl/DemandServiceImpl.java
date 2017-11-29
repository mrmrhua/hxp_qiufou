package com.houxiaopang.service.impl;

import com.houxiaopang.dao.DemandMapper;
import com.houxiaopang.model.Demand;
import com.houxiaopang.service.DemandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * author robin on 2017/11/8.
 */
@Service
public class DemandServiceImpl implements DemandService {

    @Autowired
    public DemandMapper demandMapper;

    @Override
    public Demand getDeamndByDemandId(Long id) {
        return demandMapper.selectByDemandId(id);
    }

    @Override
    @Transactional
    public int updateByPrimaryKeySelective(Demand demand) {
        return demandMapper.updateByPrimaryKeySelective(demand);
    }


    @Override
    @Transactional
    public int updataEndMoneyByDemandId(Demand demand) {
        return demandMapper.updataEndMoneyByDemandId(demand);
    }

    @Override
    public int addDemand(Demand demand) {
        return demandMapper.insert(demand);
    }
}
