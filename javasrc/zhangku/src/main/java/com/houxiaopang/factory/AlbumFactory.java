package com.houxiaopang.factory;

import com.houxiaopang.pojo.Rule;

/**
 * author robin on 2017/11/25.
 */
public abstract class AlbumFactory {

    protected String url;
    protected Rule rule;

    public AlbumFactory(String url, Rule rule) {
        this.url = url;
        this.rule = rule;
    }

    public abstract void start();
}
