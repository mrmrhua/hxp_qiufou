package com.houxiaopang.service.impl;

import com.houxiaopang.dao.AlbumsMapper;
import com.houxiaopang.detailparser.ZhangkuAlbumDetailParser;
import com.houxiaopang.model.Albums;
import com.houxiaopang.parser.ZhangkuAlbumParser;
import com.houxiaopang.pojo.Album;
import com.houxiaopang.pojo.Rule;
import com.houxiaopang.service.AlbumsService;
import com.houxiaopang.service.AsyncTask;
import com.houxiaopang.service.DesignWorksService;
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
        List<Album> rm = new ArrayList<>();
        for (int i = 0, size = albums.size(); i < size; i++) {
            if (CategoryUtil.formatCateId(albums.get(i).getCategory()) == 0) {
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
            throw new RuntimeException("警告，用户：" + userId + "，解析站酷相册:" + url + "，导入的相册为空。");
        }
        logger.info("导入结果：【用户：" + userId + "，导入站酷相册:" + url + "，共导入相册数量：" + albumsize);
        try {
            SendEmail.sendisSSL("284595745@qq.com", "导入结果通知邮件", "导入结果：【用户：" + userId + "，导入站酷相册:" + url + "，共导入相册数量：" + albumsize);
        } catch (Exception e) {
            logger.error("报错邮件发送失败。");
        }
    }
}
