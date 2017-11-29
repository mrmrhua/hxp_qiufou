package com.houxiaopang.service;

import com.houxiaopang.model.Case;
import com.houxiaopang.util.PageBean;

import java.util.List;

/**
 * author robin on 2017/11/16.
 */
public interface CaseService {


    List<Case> getCaseList(PageBean pageBean);

    Case getById(Long id);

    Integer getCount();

    Integer insert(Case c);
}
