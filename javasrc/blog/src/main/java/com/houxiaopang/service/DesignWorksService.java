package com.houxiaopang.service;

import com.houxiaopang.model.Albums;
import com.houxiaopang.pojo.Album;

import java.util.List;

/**
 * author robin on 2017/11/27.
 */
public interface DesignWorksService {

    int insertList(List<Album> albums, List<Albums> albums1s);

}
