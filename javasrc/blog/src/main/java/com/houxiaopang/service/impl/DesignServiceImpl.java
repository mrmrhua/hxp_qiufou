package com.houxiaopang.service.impl;

import com.houxiaopang.dao.DesignMapper;
import com.houxiaopang.model.Design;
import com.houxiaopang.service.DesignService;
import com.houxiaopang.util.PageBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * author robin on 2017/11/16.
 */
@Service
public class DesignServiceImpl implements DesignService {

    @Autowired
    DesignMapper designMapper;

    @Override
    public List<Design> getDesignList(PageBean pageBean) {
        return designMapper.selectAll(pageBean);
    }

    @Override
    public Design getById(Long id) {
        return designMapper.selectByPrimaryKey(id);
    }

    @Override
    public Integer getCount() {
        return designMapper.getCount();
    }

    @Override
    public Integer insert(Design design) {
        return designMapper.insert(design);
    }
}
