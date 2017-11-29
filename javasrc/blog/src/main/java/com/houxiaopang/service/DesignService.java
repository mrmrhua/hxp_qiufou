package com.houxiaopang.service;

import com.houxiaopang.model.Design;
import com.houxiaopang.util.PageBean;

import java.util.List;

/**
 * author robin on 2017/11/16.
 */
public interface DesignService {

    List<Design> getDesignList(PageBean pageBean);

    Design getById(Long id);

    Integer getCount();

    Integer insert(Design design);
}
