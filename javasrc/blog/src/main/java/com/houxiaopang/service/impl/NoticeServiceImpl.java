package com.houxiaopang.service.impl;

import com.houxiaopang.dao.NoticesMapper;
import com.houxiaopang.model.Notices;
import com.houxiaopang.model.Subscribtion;
import com.houxiaopang.service.NoticeService;
import com.houxiaopang.service.SubscribtionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * author robin on 2017/12/6.
 */
@Service
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    NoticesMapper noticesMapper;
    @Autowired
    SubscribtionService subscribtionService;

    @Override
    @Transactional
    public void add(Notices notices, Integer userId) {
        noticesMapper.insert(notices);
        Subscribtion subscribtion = new Subscribtion();
        subscribtion.setIsread(0);
        subscribtion.setNoticeId(notices.getId());
        subscribtion.setUserId(userId);
        subscribtionService.add(subscribtion);
    }
}
