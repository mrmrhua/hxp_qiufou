package com.houxiaopang.controllor;

import com.houxiaopang.model.Notices;
import com.houxiaopang.model.Verified;
import com.houxiaopang.pojo.AlbumEnum;
import com.houxiaopang.pojo.Rule;
import com.houxiaopang.service.AlbumsService;
import com.houxiaopang.service.AsyncTask;
import com.houxiaopang.service.NoticeService;
import com.houxiaopang.service.VerifiedService;
import com.houxiaopang.util.*;
import org.dom4j.DocumentException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 实名认证 and 平台作品导入
 * author robin on 2017/11/23.
 */
@RestController
@RequestMapping("/api/v1.2/verified")
public class VerifiedControllor {
    private static final Logger logger = LoggerFactory.getLogger(VerifiedControllor.class);
    @Autowired
    VerifiedService verifiedService;
    @Autowired
    AlbumsService albumsService;
    @Autowired
    AsyncTask asyncTask;
    @Autowired
    NoticeService noticeService;


    /**
     * 查询设计师实名状态
     *
     * @param request
     * @return
     */
    @GetMapping("/getverified")
    String selectVerified(HttpServletRequest request) {
        Integer userId;
        try {
            userId = HttpUtil.getUserId(request);
        } catch (Exception e) {
            return JsonUtil.errorResp(-1, "未登录或网络拥挤。");
        }
        Verified verified = verifiedService.selectByUserId(userId);
        if (verified == null) {
            return JsonUtil.successResp("status", 0);
        } else {
            Map<String, Object> map = new HashMap<>();
            map.put("status", verified.getStatus());
            verified.setCard(verified.getCard().substring(0, 1) + "****************" + verified.getCard().substring(verified.getCard().length() - 1, verified.getCard().length()));
            map.put("verified", verified);
            return JsonUtil.successResp(map);
        }
    }

    /**
     * 添加 或更新 实名认证
     *
     * @param request
     * @param verified
     * @param file1
     * @param file2
     * @return
     */
    @PostMapping("/addverified")
    String addVerified(HttpServletRequest request, Verified verified, @RequestParam("cardimgup") MultipartFile file1, @RequestParam("cardimgdown") MultipartFile file2) {
        Integer userId;
        try {
            userId = HttpUtil.getUserId(request);
        } catch (Exception e) {
            return JsonUtil.errorResp(-1, "未登录或网络拥挤。");
        }
        verified.setUserId(userId);
        if (verified.getUserId() == null || StringUtli.isEmpty(verified.getName()) || StringUtli.isEmpty(verified.getCard())) {
            return JsonUtil.errorResp(-1, "参数错误。");
        }
        verified.setStatus(1);
        verified.setUpTime(new Date());
        try {
            String file1name = "cardimg/" + verified.getUserId() + "_cardimgup." + StringUtli.getPost(file1.getOriginalFilename());
            File file1ex = new File(file1name);
            if (!file1ex.getParentFile().exists()) {
                if (!file1ex.getParentFile().mkdirs()) {
                    logger.error("实名认证，上传时，无法创建文件夹");
                    return JsonUtil.errorResp(-1, "上传失败。");
                }
            }
            BufferedOutputStream out = new BufferedOutputStream(
                    new FileOutputStream(file1ex));
            out.write(file1.getBytes());
            verified.setCardImgUp(file1name);
            out.flush();
            out.close();
            String file2name = "cardimg/" + verified.getUserId() + "_cardimgdown." + StringUtli.getPost(file2.getOriginalFilename());
            File file2ex = new File(file2name);
            if (!file2ex.getParentFile().exists()) {
                if (!file2ex.getParentFile().mkdirs()) {
                    logger.error("实名认证，上传时，无法创建文件夹");
                    return JsonUtil.errorResp(-1, "上传失败。");
                }
            }
            out = new BufferedOutputStream(
                    new FileOutputStream(file2ex));
            out.write(file2.getBytes());
            verified.setCardImgDowm(file2name);
            out.flush();
            out.close();
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
            return JsonUtil.errorResp(-1, "上传失败。");
        }
        Verified resultVer = verifiedService.selectByUserId(verified.getUserId());
        if (resultVer == null) {
            verifiedService.add(verified);
        } else {
            verifiedService.updataAllByUserId(verified);
        }
        SendEmail.send(null, "实名认证审核通知", "用户：" + userId + "，提交实名认证申请。请尽快审核！");
        return JsonUtil.successResp("msg", "ok");
    }


    /**
     * 查看所有等待实名认证审核的设计师
     *
     * @param request
     * @return
     */
    @GetMapping("/selectall")
    String updatastatus(HttpServletRequest request) {
        try {
            if (!request.getHeader("Authorization").split(" ")[1].equals("robin")) {
                return JsonUtil.errorResp(-1, "权限不足。");
            }
        } catch (Exception e) {
            return JsonUtil.errorResp(-1, "权限不足。");
        }
        List<Verified> verifies = verifiedService.getAllByStatus();
        for (Verified verified : verifies) { //todo 此处以后要优化，数据量大的话，io压力大，响应时间太长。
            try {
                verified.setCardImgUp(ImgUtil.getImgBase64(verified.getCardImgUp()));
                verified.setCardImgDowm(ImgUtil.getImgBase64(verified.getCardImgDowm()));
            } catch (Exception e) {
                logger.error(e.getMessage(), e);
                return JsonUtil.errorResp(-1, "读取失败。");
            }
        }
        return JsonUtil.successResp("verifies", verifies);
    }


    /**
     * 后台通过或拒绝实名认证
     *
     * @param userId
     * @param status
     * @param request
     * @return
     */
    @PostMapping("/updatastatus")
    String updatastatus(String userId, String status, HttpServletRequest request) {
        try {
            if (!request.getHeader("Authorization").split(" ")[1].equals("robin")) {
                return JsonUtil.errorResp(-1, "权限不足。");
            }
        } catch (Exception e) {
            return JsonUtil.errorResp(-1, "权限不足。");
        }
        if (StringUtli.isEmpty(userId)) return JsonUtil.errorResp(-1, "参数错误。");
        int userid = Integer.parseInt(userId);
        int statu = Integer.parseInt(status);
        verifiedService.updataStatusByUserId(userid, statu);
        try {
            // 实名认证结果通知
            Notices notices = new Notices();
            notices.setTitle("实名认证结果通知");
            if (statu == 2) {
                notices.setContent("<p>您提交的实名认证审核已通过。<p>");
            } else {
                notices.setContent("<p>您提交的实名认证审核未通过。<p>");
            }
            notices.setUpTime(new Date());
            noticeService.add(notices, userid);
        } catch (Exception e) {
            logger.error("用户：" + userId + "实名认证发送通知报错：" + e.getMessage(), e);
        }
        return JsonUtil.successResp("msg", "ok");
    }

    /*@GetMapping("/test")
    String insert(String url, Integer userId) {
        Map<String, Rule> map;
        try {
            map = DomParser.readConfig();
        } catch (DocumentException e) {
            logger.error(e.getMessage(), e);
            return JsonUtil.errorResp(-1, "网络拥挤。请稍后再试。");
        }
        boolean flag = false;
        for (AlbumEnum a : AlbumEnum.values()) {
            if (url.contains(a.getName())) {
                logger.info("用户:" + userId + "，开始爬取，站酷地址：" + url);
                //启动爬虫线程
                asyncTask.executeAsyncTask(url, map.get(a.getName()), userId);
                flag = true;
            }
        }
        if (flag) {
            return JsonUtil.successResp("msg", "导入中。");
        } else {
            return JsonUtil.errorResp(-2, "暂不支持此网站。");
        }
    }*/

    /**
     * 作品导入
     *
     * @param url
     * @param request
     * @return
     */
    @PostMapping("/workinsert")
    String insertwork(String url, HttpServletRequest request) {
        if (StringUtli.isEmpty(url)) return JsonUtil.errorResp(-1, "参数错误。");
        if (!url.startsWith("http://")) {
            url = "http://" + url;
        }
        if (url.equals("http://www.zcool.com.cn") || url.equals("http://zcool.com.cn")) {
            return JsonUtil.errorResp(-2, "网站地址有误。");
        }
        Integer userId;
        try {
            userId = HttpUtil.getUserId(request);
        } catch (Exception e) {
            return JsonUtil.errorResp(-1, "未登录或网络拥挤。");
        }
        Map<String, Rule> map;
        try {
            map = DomParser.readConfig();
        } catch (DocumentException e) {
            logger.error(e.getMessage(), e);
            return JsonUtil.errorResp(-1, "网络拥挤。请稍后再试。");
        }
        boolean flag = false;
        for (AlbumEnum a : AlbumEnum.values()) {
            if (url.contains(a.getName())) {
                logger.info("用户:" + userId + "，开始爬取，站酷地址：" + url);
                //启动爬虫线程
                asyncTask.executeAsyncTask(url, map.get(a.getName()), userId);
                flag = true;
            }
        }
        if (flag) {
            return JsonUtil.successResp("msg", "导入中。");
        } else {
            return JsonUtil.errorResp(-2, "暂不支持此网站。");
        }
    }

}
