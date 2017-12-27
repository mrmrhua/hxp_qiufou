package com.houxiaopang.service.impl;

import com.houxiaopang.dao.AlbumsMapper;
import com.houxiaopang.detailparser.ZhangkuAlbumDetailParser;
import com.houxiaopang.model.Albums;
import com.houxiaopang.model.Notices;
import com.houxiaopang.parser.ZhangkuAlbumParser;
import com.houxiaopang.pojo.Album;
import com.houxiaopang.pojo.Rule;
import com.houxiaopang.service.AlbumsService;
import com.houxiaopang.service.AsyncTask;
import com.houxiaopang.service.DesignWorksService;
import com.houxiaopang.service.NoticeService;
import com.houxiaopang.util.CategoryUtil;
import com.houxiaopang.util.SendEmail;
import com.houxiaopang.util.Sprid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * author robin on 2017/11/27.
 */
@Service
public class AlbumsServiceImpl implements AlbumsService {

    private static final Logger logger = LoggerFactory.getLogger(AsyncTask.class);

    @Autowired
    AlbumsMapper albumsMapper;

    @Autowired
    DesignWorksService designWorksService;

    @Autowired
    NoticeService noticeService;


    /**
     * 爬取作品，并导入数据库
     *
     * @param url
     * @param rule
     * @param userId
     */
    @Override
    @Transactional
    public void inserList(String url, Rule rule, Integer userId) {
        ZhangkuAlbumParser zhangkuAlbumParser;
        try {
            zhangkuAlbumParser = new ZhangkuAlbumParser(Sprid.getDoc(url), rule);
        } catch (RuntimeException e) {
            throw new RuntimeException("用户：" + userId + "，获取站酷相册列表:" + url + "，失败。报错：" + e.getMessage());
        }
        List<Album> albums = new ArrayList<>();
        try {
            while (zhangkuAlbumParser.hasNext()) {
                List<Album> currenAlbums = zhangkuAlbumParser.next();
                albums.addAll(currenAlbums);
            }
        } catch (RuntimeException e) {
            throw new RuntimeException("用户：" + userId + "，解析站酷相册列表:" + url + "，失败。报错：" + e.getMessage());
        }
        if (albums.size() == 0) {
            throw new RuntimeException("警告，用户：" + userId + "，解析站酷相册:" + url + "，获取的相册为空。");
        }
        int totalAlbums = albums.size();
        List<Album> rm = new ArrayList<>();
        for (int i = 0, size = albums.size(); i < size; i++) {
            if (CategoryUtil.formatCateId(albums.get(i).getCategory()) == 0) {
                //去除不支持的品类
                rm.add(albums.get(i));
                continue;
            }
            ZhangkuAlbumDetailParser zhangkuAlbumDetailParser;
            try {
                zhangkuAlbumDetailParser = new ZhangkuAlbumDetailParser(Sprid.getDoc(albums.get(i).getUrl()), albums.get(i), rule);
            } catch (RuntimeException e) {
                throw new RuntimeException("用户：" + userId + "，获取站酷相册:" + albums.get(i).getUrl() + "，失败。报错：" + e.getMessage());
            }
            try {
                while (zhangkuAlbumDetailParser.hasNext()) {
                    zhangkuAlbumDetailParser.next();
                }
            } catch (RuntimeException e) {
                throw new RuntimeException("用户：" + userId + "，解析站酷相册:" + albums.get(i).getUrl() + "，失败。报错：" + e.getMessage());
            }
        }
        albums.removeAll(rm);

        //去重
        List<Album> rma = new ArrayList<>();
        List<Albums> byUserId = albumsMapper.findByUserId(userId);
        for (int i = 0, size = albums.size(); i < size; i++) {
            for (int j = 0, jsize = byUserId.size(); j < jsize; j++) {
                if (albums.get(i).getTitle().equals(byUserId.get(j).getTitle())) {
                    rma.add(albums.get(i));
                }
            }
        }
        albums.removeAll(rma);
        List<Albums> albums1s = new ArrayList<>();
        for (Album album : albums) {
            Albums albums1 = new Albums();
            albums1.setCover(album.getCover());
            albums1.setDescription(album.getDescription());
            albums1.setTitle(album.getTitle());
            albums1.setUpTime(new Date());
            albums1.setUserId(userId);
            albums1.setCategory(CategoryUtil.formatCateId(album.getCategory()));
            albums1s.add(albums1);
        }
        int albumsize = albums1s.size();
        if (albumsize > 0) {
            albumsMapper.insertList(albums1s);
            designWorksService.insertList(albums, albums1s);
        } else {
            logger.info("导入结果警告，用户：" + userId + "，解析站酷相册:" + url + "，导入的相册为空。请检查。");
            try {
                Notices notices = new Notices();
                notices.setTitle("平台导入结果通知");
                notices.setContent("<p>导入地址为：" + url + "</p><p>共获取到作品数：" + totalAlbums + "</p><p>共导入作品数：0</p><p>请检查地址是否正确。</p><p>提示：去除了作品名重复或品类不相符的作品。</p>");
                notices.setUpTime(new Date());
                noticeService.add(notices, userId);
            } catch (Exception e) {
                logger.error(e.getMessage(), e);
                logger.info("导入作品发送用户：" + userId + "，发送通知失败。开始发送邮件通知管理员");
                SendEmail.send(null, "导入作品发送通知失败", "<html>用户：" + userId + "<p>发送通知内容：</p><p>导入地址为：" + url + "</p><p>共获取到作品数：" + totalAlbums + "</p><p>共导入作品数：0</p><p>请检查地址是否正确。</p><p>提示：去除了作品名重复或品类不相符的作品。<p/><html>");
            }
            SendEmail.send(null, "导入结果通知邮件", "警告，用户：" + userId + "，解析站酷相册:" + url + "，导入的相册为空。请检查。");
            return;
        }
        StringBuilder sb = new StringBuilder("导入结果：【用户：" + userId + "，导入站酷相册：" + url + "，爬取到相册数：" + totalAlbums + "，共导入相册数量：" + albumsize + "，导入的相册id为：【");
        for (Albums albums1 : albums1s) {
            sb.append(albums1.getId()).append("，");
        }
        sb.append("】");
        logger.info(sb.toString());
        // 提醒用户导入结果
        try {
            Notices notices = new Notices();
            notices.setTitle("平台导入结果通知");
            notices.setContent("<p>导入地址为：" + url + "</p><p>共获取到作品数：" + totalAlbums + "</p><p>共导入作品数：" + albumsize + "</p><p>提示：去除了作品名重复或品类不相符的作品。</p>");
            notices.setUpTime(new Date());
            noticeService.add(notices, userId);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            logger.info("导入作品发送用户：" + userId + "，发送通知失败。开始发送邮件通知管理员");
            SendEmail.send(null, "导入作品发送通知失败", "<html>用户：" + userId + "<p>发送通知内容：</p><p>导入地址为：" + url + "</p><p>共获取到作品数：" + totalAlbums + "</p><p>共导入作品数：" + albumsize + "</p><p>提示：去除了作品名重复或品类不相符的作品。<p/><html>");
        }
        SendEmail.send(null, "导入结果通知邮件", sb.toString());
    }
}
