package com.houxiaopang.service;

import com.houxiaopang.model.CommentsWithBLOBs;

import java.util.List;

/**
 * author robin on 2017/12/1.
 */
public interface CommentService {

    List<CommentsWithBLOBs> findByImageId(Integer imageId);

    int addComments(CommentsWithBLOBs commentsWithBLOBs);
}
