package com.houxiaopang.controllor;

import com.houxiaopang.model.CommentsWithBLOBs;
import com.houxiaopang.model.Projectworks;
import com.houxiaopang.service.CommentService;
import com.houxiaopang.service.ProjectworksService;
import com.houxiaopang.util.HttpUtil;
import com.houxiaopang.util.JsonUtil;
import com.houxiaopang.util.StringUtli;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

/**
 * 圈点批划
 * author robin on 2017/12/1.
 */

@RestController
@RequestMapping("/api/v1.2/circle")
public class Circle {

    @Autowired
    ProjectworksService projectworksService;
    @Autowired
    CommentService commentService;

    /**
     * 获取进度的所有作品（客户）
     *
     * @param id
     * @return
     */
    @GetMapping("/getprojectworks")
    String findByPostId(String id) {
        if (StringUtli.isEmpty(id)) {
            return JsonUtil.errorResp(-1, "参数错误。");
        }
        int postId;
        try {
            postId = Integer.parseInt(id);
        } catch (Exception e) {
            return JsonUtil.errorResp(-1, "参数错误。");
        }
        List<Projectworks> works = projectworksService.findByPostId(postId);
        return JsonUtil.successResp("works", works);
    }

    /**
     * 获取进度的所有作品 （设计师）
     *
     * @param id
     * @param request
     * @return
     */
    @GetMapping("/getworks")
    String findByPostId(String id, HttpServletRequest request) {
        if (StringUtli.isEmpty(id)) {
            return JsonUtil.errorResp(-1, "参数错误。");
        }
        int postId;
        try {
            postId = Integer.parseInt(id);
        } catch (Exception e) {
            return JsonUtil.errorResp(-1, "参数错误。");
        }
        Integer userId;
        try {
            userId = HttpUtil.getUserId(request);
        } catch (Exception e) {
            return JsonUtil.errorResp(-1, "未登录或网络拥挤。");
        }
        List<Projectworks> works = projectworksService.findByPostIdWithUser(userId, postId);
        return JsonUtil.successResp("works", works);
    }


    /**
     * 获取作品的所有批注 （设计师与客户）
     *
     * @param id
     * @return
     */
    @GetMapping("/getcomments")
    String findByImgId(String id) {
        if (StringUtli.isEmpty(id)) {
            return JsonUtil.errorResp(-1, "参数错误。");
        }
        int imageId;
        try {
            imageId = Integer.parseInt(id);
        } catch (Exception e) {
            return JsonUtil.errorResp(-1, "参数错误。");
        }
        List<CommentsWithBLOBs> comments = commentService.findByImageId(imageId);
        return JsonUtil.successResp("comments", comments);
    }

    /**
     * 客户添加批注
     *
     * @param comments
     * @return
     */
    @PostMapping("/addcomment")
    String addComment(CommentsWithBLOBs comments) {
        if (comments.getImageId() == null || comments.getCommentIndex() == null
                || StringUtli.isEmpty(comments.getContent())
                || StringUtli.isEmpty(comments.getDescription())) {
            return JsonUtil.errorResp(-1, "参数错误。");
        }
        Date date = new Date();
        comments.setUpTime(date);
        commentService.addComments(comments);
        //todo 通知设计师，客户添加了批注
		//不能每次添加都推送，要等客户全部批注添加完成后，在进行推送
        return JsonUtil.successResp("up_time", date);
    }
}
