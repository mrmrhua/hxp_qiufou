package com.houxiaopang.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.SimpleDateFormat;
import java.util.Map;

/**
 * author robin on 2017/11/8.
 */
public class JsonUtil {
    private static final Logger logger = LoggerFactory.getLogger(JsonUtil.class);

    public static String successResp(Map<String, Object> o) {
        try {
            return "{\"code\":0,\"data\":" + objectFormat(o) + "}";
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage(), e);
            return "{\"code\":" + -1 + ",\"data\":{\"errorMsg:\"" + "服务器内部错误" + "\"}}";
        }
    }

    public static String successResp(String name, Object value) {
        try {
            return "{\"code\":0,\"data\":{\"" + name + "\":" + objectFormat(value) + "}}";
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage(), e);
            return "{\"code\":" + -1 + ",\"data\":{\"errorMsg:\"" + "服务器内部错误" + "\"}}";
        }
    }

    public static String successResp(String name, String value) {
        return "{\"code\":0,\"data\":{\"" + name + "\":\"" + value + "\"}}";
    }

    public static String objectFormat(Object o) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        mapper.setDateFormat(sdf);
        return mapper.writeValueAsString(o);
    }

    public static String errorResp(int num, String desc) {
        return "{\"code\":" + num + ",\"data\":{\"errorMsg\":\"" + desc + "\"}}";
    }

    public static String errorResp(int num, String name, String desc) {
        return "{\"code\":" + num + ",\"data\":{\"" + name + "\":\"" + desc + "\"}}";
    }
}
