package com.houxiaopang.util;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.PrintWriter;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

/**
 * @author 墨迹
 */
public class ResponseUtil {
    /**
     * 向网页输出html
     *
     * @param response
     * @param o
     * @throws IOException
     * @throws Exception
     */
    public static void writeHtml(HttpServletResponse response, Object o) {
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = null;
        try {
            out = response.getWriter();
            out.print(o.toString());
            out.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            out.close();
        }
    }

    /**
     * 向网页输出xml
     *
     * @param response
     * @param o
     * @throws Exception
     */
    public static void writeXml(HttpServletResponse response, Object o) {
        response.setContentType("text/xml;charset=utf-8");
        PrintWriter out = null;
        try {
            out = response.getWriter();
            out.print(o);
            out.flush();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {
            out.close();
        }
    }

    /**
     * 向网页输出图片(bufferedImage)
     *
     * @param response
     * @param image
     * @throws Exception
     */
    public static void writeImage(HttpServletResponse response, BufferedImage image) {
        response.setContentType("image/jpeg");
        // 设置响应头信息，告诉浏览器不要缓存此内容
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        // 设置HttpOnly属性,防止Xss攻击
        response.setHeader("Set-Cookie", "name=value; HttpOnly");
        response.setDateHeader("Expire", 0);
        // 将图像输出到Servlet输出流中。
        ServletOutputStream sos = null;
        try {
            sos = response.getOutputStream();
            ImageIO.write(image, "jpeg", sos);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (sos != null) {
                    sos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }
}
