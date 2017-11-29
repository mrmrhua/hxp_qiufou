package com.houxiaopang.util;

import org.apache.tomcat.util.codec.binary.Base64;

import java.io.FileInputStream;
import java.io.InputStream;

/**
 * author robin on 2017/11/23.
 */
public class ImgUtil {

    /**
     * 给我一个图片路径，返回你一个base64字符串
     *
     * @param imgFile
     * @return
     * @throws Exception
     */
    public static String getImgBase64(String imgFile) throws Exception {
        InputStream in = new FileInputStream(imgFile);
        byte[] data = new byte[in.available()];
        in.read(data);
        in.close();
        return new String(Base64.encodeBase64(data));
    }
}
