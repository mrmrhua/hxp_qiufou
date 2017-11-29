package com.houxiaopang.service.impl;

import com.houxiaopang.dao.BargainTableMapper;
import com.houxiaopang.model.BargainTable;
import com.houxiaopang.service.BargainTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * author robin on 2017/11/11.
 */
@Service
public class BargainTableServiceImpl implements BargainTableService {
    @Autowired
    public BargainTableMapper bargainTableMapper;

    @Override
    public List<BargainTable> findById(Long id) {
        return bargainTableMapper.findById(id);
    }
}
