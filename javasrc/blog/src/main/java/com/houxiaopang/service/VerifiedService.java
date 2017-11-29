package com.houxiaopang.service;

import com.houxiaopang.model.Verified;

import java.util.List;

/**
 * author robin on 2017/11/23.
 */
public interface VerifiedService {

    /**
     * 添加设计师实名信息
     *
     * @param verified
     * @return
     */
    int add(Verified verified);


    /**
     * 查找设计师实名信息
     *
     * @param userId
     * @return
     */
    Verified selectByUserId(Integer userId);

    /**
     * 修改实名的状态
     *
     * @param userId
     * @return
     */
    void updataStatusByUserId(Integer userId, Integer status);

    /**
     * 重新提交实名认证
     *
     * @param verified
     * @return
     */
    int updataAllByUserId(Verified verified);

    List<Verified> getAllByStatus();

}
