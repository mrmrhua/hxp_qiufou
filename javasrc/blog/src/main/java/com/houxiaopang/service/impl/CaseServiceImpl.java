package com.houxiaopang.service.impl;

import com.houxiaopang.dao.CaseMapper;
import com.houxiaopang.model.Case;
import com.houxiaopang.service.CaseService;
import com.houxiaopang.util.PageBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * author robin on 2017/11/16.
 */
@Service
public class CaseServiceImpl implements CaseService {

    @Autowired
    CaseMapper caseMapper;

    @Override
    public List<Case> getCaseList(PageBean pageBean) {
        return caseMapper.selectAll(pageBean);
    }

    @Override
    public Case getById(Long id) {
        return caseMapper.selectByPrimaryKey(id);
    }

    @Override
    public Integer getCount() {
        return caseMapper.getCount();
    }

    @Override
    public Integer insert(Case c) {
        return caseMapper.insert(c);
    }
}
