package com.houxiaopang.util;

import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;

/**
 * author 墨迹 on 2017/8/25.
 */
public class MyHttpGet extends HttpGet{

    public MyHttpGet(String url){
        super(url);
        setDefaultConfig();
    }

    private void setDefaultConfig(){
        this.setConfig(RequestConfig.custom().setConnectTimeout(10000).setConnectionRequestTimeout(10000).setSocketTimeout(2000).build());
        this.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36");
    }
}
