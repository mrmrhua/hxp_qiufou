package com.houxiaopang.factory.impl;

import com.houxiaopang.dao.AlbumsMapper;
import com.houxiaopang.dao.DesignworksMapper;
import com.houxiaopang.detailparser.ZhangkuAlbumDetailParser;
import com.houxiaopang.factory.AlbumFactory;
import com.houxiaopang.parser.ZhangkuAlbumParser;
import com.houxiaopang.pojo.Album;
import com.houxiaopang.pojo.Albums;
import com.houxiaopang.pojo.Designworks;
import com.houxiaopang.pojo.Rule;
import com.houxiaopang.util.MybatisUtil;
import com.houxiaopang.util.Sprid;
import org.apache.ibatis.session.SqlSession;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * author robin on 2017/11/25.
 */
public class ZhangkuAlbumFaImpl extends AlbumFactory {

    public ZhangkuAlbumFaImpl(String url, Rule rule) {
        super(url, rule);
    }

    public void start() {
        try {
            ZhangkuAlbumParser zhangkuAlbumParser = new ZhangkuAlbumParser(Sprid.getDoc(url), rule);
            List<Album> albums = new ArrayList<>();
            while (zhangkuAlbumParser.hasNext()) {
                List<Album> currenAlbums = zhangkuAlbumParser.next();
                albums.addAll(currenAlbums);
            }
            for (Album album : albums) {
                try {
                    ZhangkuAlbumDetailParser zhangkuAlbumDetailParser = new ZhangkuAlbumDetailParser(Sprid.getDoc(album.getUrl()), album, rule);
                    while (zhangkuAlbumDetailParser.hasNext()) {
                        zhangkuAlbumDetailParser.next();
                    }
                } catch (Exception e) {
                    continue;
                }
            }
            List<Albums> result = getResult(albums);
            inserworks(result, albums);


        } catch (RuntimeException e) {
            System.err.println(e.getMessage());
        }
    }

    public List<Albums> getResult(List<Album> albums) {
        List<Albums> albums1s = new ArrayList<>();
        for (Album album : albums) {
            Albums albums1 = new Albums();
            albums1.setCover(album.getCover());
            albums1.setDescription(album.getDescription());
            albums1.setTitle(album.getTitle());
            albums1.setUpTime(new Date());
            albums1.setUserId(32);
            albums1.setCategory(1);
            albums1s.add(albums1);
        }
        SqlSession mysql = MybatisUtil.getInstance();
        AlbumsMapper mapper = mysql.getMapper(AlbumsMapper.class);
        mapper.insertList(albums1s);
        mysql.commit();
        return albums1s;
    }

    public void inserworks(List<Albums> albumss, List<Album> albums) {
        List<Designworks> indesignworks = new ArrayList<>();
        for (int i = 0, size = albumss.size(); i < size; i++) {
            for (String img : albums.get(i).getImgs()) {
                Designworks designworks = new Designworks();
                designworks.setAlbumId(albumss.get(i).getId());
                designworks.setCategory(albumss.get(i).getCategory());
                designworks.setUpTime(albumss.get(i).getUpTime());
                designworks.setWorkUrl(img);
                indesignworks.add(designworks);
            }
        }
        SqlSession mysql = MybatisUtil.getInstance();
        DesignworksMapper mapper = mysql.getMapper(DesignworksMapper.class);
        mapper.insertList(indesignworks);
        mysql.commit();
    }

}
