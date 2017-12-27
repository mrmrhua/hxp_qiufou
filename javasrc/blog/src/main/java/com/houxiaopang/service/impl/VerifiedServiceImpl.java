package com.houxiaopang.service.impl;

import com.houxiaopang.dao.DesignersMapper;
import com.houxiaopang.dao.VerifiedMapper;
import com.houxiaopang.model.Verified;
import com.houxiaopang.service.VerifiedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * author robin on 2017/11/23.
 */
@Service
public class VerifiedServiceImpl implements VerifiedService {

    @Autowired
    VerifiedMapper verifiedMapper;

    @Autowired
    DesignersMapper designerMapper;

    @Override
    public int add(Verified verified) {
        return verifiedMapper.insert(verified);
    }

    @Override
    public Verified selectByUserId(Integer userId) {
        return verifiedMapper.selectByUserId(userId);
    }

    @Override
    @Transactional
    public void updataStatusByUserId(Integer userId, Integer status) {
        boolean statu;
        switch (status) {
            case 2:
                statu = true;
                break;
            default:
                statu = false;
        }
        designerMapper.updataVerifiedByUserId(userId, statu);
        verifiedMapper.updataStatusByUserId(userId, status);
    }

    @Override
    public int updataAllByUserId(Verified verified) {
        return verifiedMapper.updataAllByUserId(verified);
    }

    @Override
    public List<Verified> getAllByStatus() {
        return verifiedMapper.selectAll();
    }
}
