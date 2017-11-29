package com.houxiaopang.util;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.Map;

/**
 * author 墨迹 on 2017/6/9.
 */
public class HttpUtil {


    /**
     * http get请求 5000超时
     *
     * @param argurl url
     * @param map    data
     * @return String response
     * @throws IOException
     */
    public static String getResponse(String argurl, Map<String, String> map) throws IOException {
        argurl = hasData(argurl, map);
        URL url = new URL(argurl);
        URLConnection urlConnection = url.openConnection();
        urlConnection.setRequestProperty("Content-Type", "application/json;charset=utf-8");
        urlConnection.setConnectTimeout(2_000);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        InputStream in = urlConnection.getInputStream();
        byte[] buff = new byte[1024];
        int len;
        while ((len = in.read(buff, 0, 1024)) != -1) {
            baos.write(buff, 0, len);
        }
        String info = new String(baos.toByteArray());
        in.close();
        baos.close();
        return info;
    }

    public static String getResponse(String argurl, Map<String, String> map, String token) throws IOException {
        argurl = hasData(argurl, map);
        URL url = new URL(argurl);
        URLConnection urlConnection = url.openConnection();
        urlConnection.setRequestProperty("Content-Type", "application/json;charset=utf-8");
        urlConnection.setRequestProperty("Authorization", "Token " + token);
        urlConnection.setConnectTimeout(2_000);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        InputStream in = urlConnection.getInputStream();
        byte[] buff = new byte[1024];
        int len;
        while ((len = in.read(buff, 0, 1024)) != -1) {
            baos.write(buff, 0, len);
        }
        String info = new String(baos.toByteArray());
        in.close();
        baos.close();
        return info;
    }


    private static String hasData(String argurl, Map<String, String> map) {
        StringBuilder argurlBuilder = new StringBuilder(argurl);
        if (map != null) {
            argurlBuilder.append("?");
            for (String s : map.keySet()) {
                argurlBuilder.append(s).append("=").append(map.get(s)).append("&");
            }
            argurlBuilder.deleteCharAt(argurlBuilder.length() - 1);
            // todo 由于程序在同一台服务器上，所以将www.houxiaopang.com 替换成127.0.0.1
        }
        argurl = argurlBuilder.toString().replaceAll("www.houxiaopang.com","127.0.0.1");
        return argurl;
    }
}
