package com.houxiaopang.controllor;

import com.houxiaopang.model.Case;
import com.houxiaopang.model.Design;
import com.houxiaopang.service.CaseService;
import com.houxiaopang.service.DesignService;
import com.houxiaopang.util.JsonUtil;
import com.houxiaopang.util.PageBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;
import java.util.List;

/**
 * author robin on 2017/11/16.
 */
@Controller
@RequestMapping("/blog")
public class BlogControllor {

    @Autowired
    DesignService designService;

    @Autowired
    CaseService caseService;


    @GetMapping("/404")
    String notfond() {
        return "404";
    }

    @GetMapping("/case/{id}")
    ModelAndView casecontent(@PathVariable("id") String id) {//文章
        ModelAndView mav = new ModelAndView();
        Long caseid;
        try {
            caseid = new Long(id);
        } catch (Exception e) {
            mav.setViewName("404");
            return mav;
        }
        Case byId = caseService.getById(caseid);
        if (byId == null) {
            mav.setViewName("404");
            return mav;
        }
        mav.addObject("article", byId);
        mav.setViewName("article");
        return mav;
    }

    /**
     * @return 案例中心首页
     */
    @GetMapping("")
    ModelAndView home() {
        return introduce("1", "12");
    }


    @GetMapping("/case")
    ModelAndView introduce(@RequestParam(required = false, value = "page") String page, @RequestParam(required = false, value = "rows") String rows) {//案例中心
        PageBean pageBean = pageCheke(page, rows);
        List<Case> cases = caseService.getCaseList(pageBean);
        Integer count = caseService.getCount();
        Integer totalpage = (count + pageBean.getRows() - 1) / pageBean.getRows();
        ModelAndView mav = new ModelAndView();
        mav.addObject("totalpage", totalpage);
        mav.addObject("nowpage", pageBean.getPage());
        mav.addObject("cases", cases);
        mav.setViewName("introduce");
        return mav;
    }

    PageBean pageCheke(String page, String rows) {
        try {
            if (rows == null || Integer.valueOf(rows) <= 0) {
                rows = "12";
            }
            if (page == null || Integer.valueOf(page) <= 0) {
                page = "1";
            }
        } catch (Exception e) {
            rows = "12";
            page = "1";
        }
        return new PageBean(Integer.valueOf(page), Integer.valueOf(rows));
    }

    @GetMapping("/design")
    ModelAndView designd(@RequestParam(required = false, value = "page") String page, @RequestParam(required = false, value = "rows") String rows) {//设计点滴
        PageBean pageBean = pageCheke(page, rows);
        List<Design> designs = designService.getDesignList(pageBean);
        Integer count = designService.getCount();
        Integer totalpage = (count + pageBean.getRows() - 1) / pageBean.getRows();
        ModelAndView mav = new ModelAndView();
        mav.addObject("designs", designs);
        mav.addObject("totalpage", totalpage);
        mav.addObject("nowpage", pageBean.getPage());
        mav.setViewName("design");
        return mav;
    }

    @GetMapping("/design/{id}")
    ModelAndView design(@PathVariable("id") String id) {//文章
        ModelAndView mav = new ModelAndView();
        Long desingid;
        try {
            desingid = new Long(id);
        } catch (Exception e) {
            mav.setViewName("404");
            return mav;
        }
        Design byId = designService.getById(desingid);
        if (byId == null) {
            mav.setViewName("404");
            return mav;
        }
        mav.addObject("article", byId);
        mav.setViewName("article");
        return mav;
    }

    @PostMapping("/addcase")
    @ResponseBody
    String addcase(Case cases) {
        if (cases.getContent() == null || cases.getContent().trim().equals("")
                || cases.getCover() == null || cases.getCover().trim().equals("")
                || cases.getDescription() == null || cases.getDescription().trim().equals("")
                || cases.getTitle() == null || cases.getTitle().trim().equals("")) {
            return JsonUtil.errorResp(-1, "参数错误。");
        }
        cases.setDate(new Date());
        caseService.insert(cases);
        return JsonUtil.successResp("msg", "成功。");
    }

    @PostMapping("/adddesign")
    @ResponseBody
    String adddesign(Design design) {
        if (design.getContent() == null || design.getContent().trim().equals("")
                || design.getCover() == null || design.getCover().trim().equals("")
                || design.getDescription() == null || design.getDescription().trim().equals("")
                || design.getTitle() == null || design.getTitle().trim().equals("")) {
            return JsonUtil.errorResp(-1, "参数错误。");
        }
        design.setDate(new Date());
        designService.insert(design);
        return JsonUtil.successResp("msg", "成功。");
    }

}
