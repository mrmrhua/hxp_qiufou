package com.houxiaopang.util;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.houxiaopang.controllor.BlogControllor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
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
    private static final Logger logger = LoggerFactory.getLogger(HttpUtil.class);
    /**
     * 设计师登录验证，并返回id
     *
     * @param request
     * @return
     */
    public static Integer getUserId(HttpServletRequest request) {
        String token;
        try {
            token = request.getHeader("Authorization").split(" ")[1];
        } catch (Exception e) {
            throw new RuntimeException("未登录");
        }
        try {
            String response = getResponse("http://www.houxiaopang.com/api/v1.1/designerdash/header", null, token);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response);
            int status = jsonNode.get("code").asInt();
            if (status == 0) {
                JsonNode data = jsonNode.get("data");
                return data.get("userid").asInt();
            } else {
                throw new RuntimeException("未登录");
            }
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
            throw new RuntimeException("未登录或服务器错误。");
        }
    }


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
        }
        // todo 由于程序在同一台服务器上，所以将www.houxiaopang.com 替换成127.0.0.1
        //argurl = argurlBuilder.toString().replaceAll("www.houxiaopang.com", "127.0.0.1");
        return argurlBuilder.toString();
    }
}
