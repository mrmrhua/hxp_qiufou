package com.houxiaopang.service;

import com.houxiaopang.model.Projectworks;

import java.util.List;

/**
 * author robin on 2017/12/1.
 */
public interface ProjectworksService {

    List<Projectworks> findByPostId(Integer postId);

    List<Projectworks> findByPostIdWithUser(Integer userId, Integer postId);
}
