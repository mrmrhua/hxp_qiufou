package com.houxiaopang.service;

import com.houxiaopang.model.BargainTable;

import java.util.List;

/**
 * author robin on 2017/11/11.
 */
public interface BargainTableService {
    public List<BargainTable> findById(Long id);
}
