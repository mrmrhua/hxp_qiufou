package com.chuxin.controller;

import com.chuxin.dao.ChuxinMapper;
import com.chuxin.model.Chuxin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

/**
 * author robin on 2017/12/12.
 */
@Controller
public class Index {
    private static final Logger logger = LoggerFactory.getLogger(Index.class);
    @Autowired
    ChuxinMapper chuxinMapper;

    @PostMapping("/chuxin/api")
    @ResponseBody
    String post(Chuxin chuxin) {
        try {
            if (chuxin == null || chuxin.getAddress() == null || chuxin.getAddress().equals("")
                    || chuxin.getName() == null || chuxin.getName().equals("")
                    || chuxin.getTel() == null || chuxin.getTel().equals("")
                    || chuxin.getJoined() == null)
                return "-1";
            chuxin.setUpTime(new Date());
            chuxinMapper.insert(chuxin);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return "-1";
        }
        return "0";
    }

    @GetMapping("/chuxin")
    String index() {
        return "index";
    }
}
