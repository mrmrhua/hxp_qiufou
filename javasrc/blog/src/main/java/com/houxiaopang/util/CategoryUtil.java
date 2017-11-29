package com.houxiaopang.util;

/**
 * author robin on 2017/11/29.
 */
public class CategoryUtil {

    public static int formatCateId(String name) {
        if (name.contains("文章")) {
            return 0;
        } else if (name.contains("平面-PPT/演示")) {
            return 1;
        } else if (name.contains("UI") || name.contains("网页")) {
            return 2;
        } else if (name.contains("平面-书装/画册")) {
            return 3;
        } else if (name.contains("平面-海报")) {
            return 4;
        } else if (name.contains("平面-标志")) {
            return 5;
        } else if (name.contains("平面-品牌")) {
            return 6;
        } else {
            return 0;
        }
    }
}
