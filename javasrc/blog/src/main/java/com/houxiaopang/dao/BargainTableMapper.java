package com.houxiaopang.dao;

import com.houxiaopang.model.BargainTable;

import java.util.List;

public interface BargainTableMapper {

    List<BargainTable> findById(Long id);
}