package com.houxiaopang.service;

import com.houxiaopang.model.Notices;

/**
 * author robin on 2017/12/6.
 */
public interface NoticeService {

    /**
     * 给设计师发送邮件
     * @param notices
     * @return
     */
    void add(Notices notices, Integer userId);

}
