package com.houxiaopang.service.impl;

import com.houxiaopang.dao.BargainMapper;
import com.houxiaopang.dao.DemandMapper;
import com.houxiaopang.model.Bargain;
import com.houxiaopang.model.Demand;
import com.houxiaopang.service.BargainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * author robin on 2017/11/8.
 */
@Service
public class BargainServiceImpl implements BargainService {
    @Autowired
    public BargainMapper bargainMapper;
    @Autowired
    public DemandMapper demandMapper;

    @Override
    public Bargain getBargainById(Long id) {
        return bargainMapper.selectByPrimaryKey(id);
    }

    @Override
    @Transactional
    public void addBargain(Bargain bargain, Demand demand) {
        bargainMapper.insert(bargain);
        demandMapper.updataEndMoneyByDemandId(demand);
    }

    @Override
    public boolean isBargained(Long userId,Long demandId) {
        Bargain bargain = bargainMapper.selectByUserId(userId,demandId);
        return bargain != null;
    }
}
