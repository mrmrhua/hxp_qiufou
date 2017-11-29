package com.houxiaopang.util;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;

/**
 * author 墨迹 on 2017/8/25.
 * <p>
 * 爬虫
 */
public class Sprid {

    /**
     * 给我一个网址，我返回给你一个html文档
     * 如果获取失败，默认重试5次
     *
     * @param url 站酷的网址
     * @return 站酷的HTML
     */
    public static Document getDoc(String url) {
        for (int i = 0; i < 5; i++) {
            CloseableHttpClient httpClient = HttpClients.createDefault();
            try (CloseableHttpResponse response = httpClient.execute(new MyHttpGet(url))) {
                return Jsoup.parse(EntityUtils.toString(response.getEntity(), "utf-8"));
            } catch (IOException e) {
                if (i == 4) {
                    throw new RuntimeException("获取 [" + url + "] 的网页失败");
                } else {
                    System.err.println("第" + (i + 1) + "次，获取 [" + url + "] 的网页失败");
                }
            }
        }
        throw new RuntimeException("获取 [" + url + "] 的网页失败");
    }

}
