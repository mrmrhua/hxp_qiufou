package com.houxiaopang.service.impl;

import com.houxiaopang.dao.CommentsMapper;
import com.houxiaopang.model.CommentsWithBLOBs;
import com.houxiaopang.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * author robin on 2017/12/1.
 */
@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    CommentsMapper commentsMapper;

    @Override
    public List<CommentsWithBLOBs> findByImageId(Integer imageId) {
        return commentsMapper.selectByImageId(imageId);
    }

    @Override
    public int addComments(CommentsWithBLOBs commentsWithBLOBs) {
        System.out.println(commentsWithBLOBs);
        return commentsMapper.insertSelective(commentsWithBLOBs);
    }
}
