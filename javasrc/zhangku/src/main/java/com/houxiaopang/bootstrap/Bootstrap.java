package com.houxiaopang.bootstrap;

import com.houxiaopang.factory.AlbumFactory;
import com.houxiaopang.factory.impl.ZhangkuAlbumFaImpl;
import com.houxiaopang.pojo.AlbumEnum;
import com.houxiaopang.util.DomParser;
import org.dom4j.DocumentException;

/**
 * author robin on 2017/8/26.
 */
public class Bootstrap {
    public static void main(String[] args) {
        String url = "http://aervea.zcool.com.cn";
        try {
            new Bootstrap().start(url).start();
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }

    public AlbumFactory start(String url) throws DocumentException {
        for (AlbumEnum a : AlbumEnum.values()) {
            if (url.contains(a.getName())) {
                return new ZhangkuAlbumFaImpl(url, DomParser.readConfig().get(a.getName()));
            }
        }
        throw new RuntimeException("暂不支持此网站。");
    }

}
