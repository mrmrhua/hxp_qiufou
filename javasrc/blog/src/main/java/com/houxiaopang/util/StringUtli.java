package com.houxiaopang.util;

/**
 * 字符串工具类
 *
 * @author 墨迹
 */
public class StringUtli {

    /**
     * 得到后缀名
     *
     * @param string 文件的名
     * @return
     */
    public static String getPost(String string) {
        return split(string, "\\.", -1);
    }

    /**
     * 判断是否是空
     *
     * @param string 用于判断的字符串
     * @return 如果string是空，返回true，否则返回false
     */
    public static boolean isEmpty(String string) {
        if (string == null || "".equals(string.trim())) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 判断日期格式是否正确
     *
     * @param string 用于判断的字符串
     * @return 如过string的格式符合日期的格式，返回true。否则返回false
     */
    public static boolean isDate(String string) {
        String rex = "(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)";
        if (string.matches(rex)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 判断是否是纯数字
     *
     * @param string 用于判断的字符串
     * @return
     */
    public static boolean isNumber(String string) {
        String od = "[0-9]";
        for (int i = 0; i < string.length(); i++) {
            String s = String.valueOf(string.charAt(i));
            if (s.matches(od)) {
                continue;
            } else {
                return false;
            }
        }
        return true;
    }

    /**
     * 字符串的分割
     *
     * @param string 需要进行分割的字符串
     * @param rex    用于分割字符串的正则表达式或者字符串
     * @param index  用于返回分割后字符串的第几段 -1或不存在，返回最后一段
     * @return 返回分割后的字符串的第index段 或 最后一段
     */
    public static String split(String string, String rex, int index) {
        String[] strings = string.split(rex);
        if (index == -1) {
            return strings[strings.length - 1];
        }
        for (int i = 0; i < strings.length; i++) {
            if (i == index) {
                return strings[i];
            }
        }
        return strings[strings.length - 1];
    }

    /**
     * 判断是否是大于零的数字包括一个小数点
     *
     * @param string
     * @return
     */
    public static boolean isdouble(String string) {
        String od = "[0-9]";
        int con = 0;
        for (int i = 0; i < string.length(); i++) {
            String s = String.valueOf(string.charAt(i));
            if (s.matches(od)) {
                continue;
            } else if (s.equals(".")) {
                con++;
            } else {
                return false;
            }
        }
        if (con != 1 && con != 0) {
            return false;
        }
        return true;
    }

    /**
     * 如果参数包含@符号，则返回真
     *
     * @param email
     * @return
     */
    public static boolean haveAt(String email) {
        byte[] bs = email.getBytes();
        for (int i = 0; i < bs.length; i++) {
            if (bs[i] == '@') {
                return true;
            }
        }
        return false;
    }


    /**
     * 判断是否不是空
     *
     * @param string
     * @return
     */
    public static boolean isNotEmpty(String string) {
        if (string != null && !"".equals(string.trim())) {
            return true;
        } else {
            return false;
        }
    }
}
