package com.houxiaopang.service;

import com.houxiaopang.controllor.BlogControllor;
import com.houxiaopang.model.Notices;
import com.houxiaopang.pojo.Rule;
import com.houxiaopang.util.SendEmail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * 多线程
 * author robin on 2017/11/28.
 */
@Service
public class AsyncTask {
    @Autowired
    AlbumsService albumsService;
    @Autowired
    NoticeService noticeService;
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
            logger.info("用户：" + userId + "，导入站酷地址：" + url + "，结束");
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            try {
                Notices notices = new Notices();
                notices.setTitle("平台导入结果通知");
                notices.setContent("<p>导入地址为：" + url + "。</p><p>结果：导入失败</p><p>请检查是地址是否正确，并重试。</p><p>意见反馈，请发邮件到：dyh@houxiaopang.com。</p>");
                notices.setUpTime(new Date());
                noticeService.add(notices, userId);
            } catch (Exception e1) {
                logger.error(e1.getMessage(), e1);
                logger.error("导入作品发送用户：" + userId + "，发送通知失败。开始发送邮件通知管理员");
                SendEmail.send(null, "导入作品发送通知失败", "<html><p>用户：" + userId + "</p><p>发送通知内容：</p><p>导入地址为：" + url + "。</p><p>结果：导入失败</p><p>请检查是地址是否正确，并重试。</p><p>请检查是地址是否正确，并重试。</p><p>意见反馈，请发邮件到：dyh@houxiaopang.com。</p>");
            }
            SendEmail.send(null, "程序报错通知邮件", e.getMessage());
            logger.info("用户：" + userId + "，导入站酷地址：" + url + "，结束");
        }
    }

}
