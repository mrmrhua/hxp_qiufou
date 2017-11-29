package com.houxiaopang.pojo;


/**
 * author robin on 2017/11/25.
 */
public enum AlbumEnum {
    ZHANGKU("zcool.com.cn", 1), HOUXIAOPANG("www.houxiaopang.com", 2);

    private String name;
    private int index;

    AlbumEnum(String name, int index) {
        this.name = name;
        this.index = index;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }
}
