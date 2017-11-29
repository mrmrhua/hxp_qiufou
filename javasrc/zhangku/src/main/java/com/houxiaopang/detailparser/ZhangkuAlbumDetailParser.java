package com.houxiaopang.detailparser;

import com.houxiaopang.pojo.Album;
import com.houxiaopang.pojo.Rule;
import com.houxiaopang.util.Sprid;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * author robin on 2017/8/26.
 * 站酷网页作品详情的解析器
 */
public class ZhangkuAlbumDetailParser {

    private Document doc;
    private Album album;
    private boolean frist = true;
    private Rule rule;

    public ZhangkuAlbumDetailParser(Document doc, Album album, Rule rule) {
        this.doc = doc;
        this.album = album;
        this.rule = rule;
    }

    private void parserAlbumDetail() {
        try {
            if (frist) {
                frist = false;
                try {
                    album.setDescription(doc.select(rule.getDescription()).first().html());
                } catch (Exception e) {
                    album = null;
                }
            }
            Elements elements = doc.select(rule.getImg());
            for (Element element : elements) {
                String[] img = element.getElementsByTag("img").first().attr("src").split("@");
                album.getImgs().add(img[0]);
            }
        } catch (Exception e) {
            throw new RuntimeException(album.getUrl() + "作品内容解析出错。");
        }
    }

    public boolean hasNext() {
        return frist || doc.select(rule.getNextpage()).size() > 0;
    }

    public void next() {
        if (!frist) {
            String href = doc.select(rule.getNextpage()).first().attr("href");
            href = href.startsWith("http://") ? href : "http://" + rule.getName() + href;
            this.doc = Sprid.getDoc(href);
        }
        parserAlbumDetail();
    }
}
