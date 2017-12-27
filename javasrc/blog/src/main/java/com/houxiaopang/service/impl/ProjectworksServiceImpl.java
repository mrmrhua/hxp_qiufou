package com.houxiaopang.service.impl;

import com.houxiaopang.dao.ProjectworksMapper;
import com.houxiaopang.model.Projectworks;
import com.houxiaopang.service.ProjectworksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * author robin on 2017/12/1.
 */
@Service
public class ProjectworksServiceImpl implements ProjectworksService {

    @Autowired
    ProjectworksMapper projectworksMapper;


    @Override
    public List<Projectworks> findByPostId(Integer postId) {
        return projectworksMapper.findByPostId(postId);
    }

    @Override
    public List<Projectworks> findByPostIdWithUser(Integer userId, Integer postId) {
        return projectworksMapper.findByPostIdWithUser(userId, postId);
    }


}
