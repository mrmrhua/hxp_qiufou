package com.houxiaopang.service;

/**
 * author robin on 2017/11/24.
 * 设计师
 */
public interface DesignerService {

    /**
     * 根据设计师id修改 实名认证状态
     *
     * @param userId
     * @return
     */
    int updataVerifiedByUserId(Integer userId);

}
