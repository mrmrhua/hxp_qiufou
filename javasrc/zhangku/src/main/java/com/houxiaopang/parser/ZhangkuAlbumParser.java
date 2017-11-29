package com.houxiaopang.parser;

import com.houxiaopang.pojo.Album;
import com.houxiaopang.pojo.Rule;
import com.houxiaopang.util.Sprid;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.ArrayList;
import java.util.List;

/**
 * author robin on 2017/8/26.
 * 一个站酷网页作品列表的解析器
 */
public class ZhangkuAlbumParser {

    private Document doc;
    private Rule rule;
    private boolean frist = true;

    public ZhangkuAlbumParser(Document doc, Rule rule) {
        this.doc = doc;
        this.rule = rule;
    }

    private List<Album> parserAlbums() {
        try {
            List<Album> albums = new ArrayList<>();
            Elements elements = doc.select(rule.getList());
            for (int i = 0, size = elements.size(); i < size; i++) {
                Album album = new Album();
                Element cardImg = elements.get(i).select(rule.getUrl()).first();
                album.setUrl(cardImg.attr("abs:href"));
                album.setTitle(cardImg.attr("title"));
                String[] cover = cardImg.getElementsByTag("img").first().attr("src").split("@");
                album.setCover(cover[0]);
                album.setCategory(elements.get(i).select(rule.getCategory()).first().text());
                albums.add(album);
            }
            if (frist) {
                frist = false;
            }
            return albums;
        } catch (Exception e) {
            throw new RuntimeException("作品列表解析出错。");
        }
    }

    public boolean hasNext() {
        return frist || doc.select(rule.getNextpage()).size() > 0;
    }

    public List<Album> next() {
        if (!frist) {
            String href = doc.select(rule.getNextpage()).first().attr("href");
            href = href.startsWith("http://") ? href : "http://" + rule.getName() + href;
            this.doc = Sprid.getDoc(href);
        }
        return parserAlbums();
    }

}
