package com.houxiaopang.service;

import com.houxiaopang.model.Subscribtion;

/**
 * 通知中间表
 * author robin on 2017/12/6.
 */
public interface SubscribtionService {

    /**
     * 发送通知
     * @param subscribtion
     * @return
     */
    int add(Subscribtion subscribtion);
}
