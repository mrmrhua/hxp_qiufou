package com.houxiaopang.service;

import com.houxiaopang.controllor.BlogControllor;
import com.houxiaopang.pojo.Rule;
import com.houxiaopang.util.SendEmail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * 多线程
 * author robin on 2017/11/28.
 */
@Service
public class AsyncTask {
    @Autowired
    AlbumsService albumsService;

    private static final Logger logger = LoggerFactory.getLogger(AsyncTask.class);

    /**
     * 导入站酷
     *
     * @param url
     * @param rule
     * @param userId
     */
    @Async
    public void executeAsyncTask(String url, Rule rule, Integer userId) {
        try {
            albumsService.inserList(url, rule, userId);
            logger.info("用户:" + userId + "，导入站酷地址：" + url + "，成功。");
        } catch (Exception e) {
            logger.error(e.getMessage());
            try {
                SendEmail.sendisSSL("284595745@qq.com", "程序报错通知邮件", e.getMessage());
            } catch (Exception e1) {
                logger.error("报错邮件发送失败。");
            }
        }
    }

}
