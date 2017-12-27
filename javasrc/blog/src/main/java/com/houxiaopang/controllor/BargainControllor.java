package com.houxiaopang.controllor;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.houxiaopang.model.Bargain;
import com.houxiaopang.model.BargainTable;
import com.houxiaopang.model.Demand;
import com.houxiaopang.model.User;
import com.houxiaopang.service.BargainService;
import com.houxiaopang.service.BargainTableService;
import com.houxiaopang.service.DemandService;
import com.houxiaopang.service.UserService;
import com.houxiaopang.util.HttpUtil;
import com.houxiaopang.util.JsonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * author robin on 2017/11/7.
 */
@RestController
@RequestMapping("/api/v1.2/bargain")
public class BargainControllor {
    private static final Logger logger = LoggerFactory.getLogger(BargainControllor.class);
    @Autowired
    BargainTableService bargainTableService;

    @Autowired
    DemandService demandService;

    @Autowired
    BargainService bargainService;

    @Autowired
    UserService userService;

    /**
     * 获取项目砍价信息列表和项目信息
     *
     * @param id
     * @return 如无信息列表list，之返回项目信息object
     * 项目不存在或参数错误，返回code=-1 以及错误信息
     */
    @GetMapping("/getfirstpage")
    String getDemand(String id, String token) {
        if (token == null || token.trim().equals("")) {
            return JsonUtil.errorResp(-1, "未登录。");
        }
        Long demandId;
        try {
            demandId = new Long(id);
        } catch (Exception e) {
            return JsonUtil.errorResp(-1, "参数错误。");
        }
        List<BargainTable> bargains = bargainTableService.findById(demandId);
        if (bargains.size() == 0) {
            Demand demand = demandService.getDeamndByDemandId(demandId);
            if (demand == null) {
                return JsonUtil.errorResp(-2, "该项目不存在。");
            } else {
                Map<String, Object> m = new HashMap<>();
                m.put("demand", demand);
                m.put("bargains", bargains);
                return JsonUtil.successResp(m);
            }
        }
        Map<String, Object> m = new HashMap<>();
        Demand demand = new Demand();
        demand.setDemandId(bargains.get(0).getId());
        demand.setEndMoney(bargains.get(0).getEndMoney());
        demand.setAimsMoney(bargains.get(0).getAimsMoney());
        demand.setStartMoney(bargains.get(0).getStartMoney());
        demand.setNickname(bargains.get(0).getNickname());
        m.put("demand", demand);
        m.put("bargains", bargains);
        return JsonUtil.successResp(m);
    }

    /**
     * 登录功能
     *
     * @param code 微信的code
     * @return
     */
    @GetMapping("/login")
    String login(String code) {
        if (code == null || code.trim().equals("")) {
            return JsonUtil.errorResp(-1, "参数错误。");
        }
        try {
            Map<String, String> map = new HashMap<>();
            map.put("code", code);
            User user = new User();
            String response = HttpUtil.getResponse("http://www.houxiaopang.com/api/v1.1/wx_getuserinfo", map);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response);
            int status = jsonNode.get("code").asInt();
            if (status == 0) {
                JsonNode data = jsonNode.get("data");
                user.setHeadImg(data.get("headimg").asText());
                user.setName(data.get("nickname").asText());
                user.setUid(data.get("unionid").asText());
            } else {
                return JsonUtil.errorResp(-1, "登录失败。");
            }
            User resultUser = userService.getUserByUid(user.getUid());
            if (resultUser == null) {
                userService.addUser(user);
            }
            return JsonUtil.successResp("msg", user.getUid());
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
            return JsonUtil.errorResp(-1, "登录失败。");
        }
    }

    /**
     * 砍价功能
     *
     * @return code -1 错误，code -2 砍过价，code 0 砍价成功，返回砍价金额
     */
    @PostMapping("/bargain")
    String bargain(String id, String token) {
        if (token == null || token.trim().equals("")) {
            return JsonUtil.errorResp(-1, "未登录。");
        }
        Long demandId;
        try {
            demandId = new Long(id);
        } catch (Exception e) {
            return JsonUtil.errorResp(-1, "参数错误。");
        }
        int m = (int) (Math.random() * 20) + 20;
        BigDecimal money = new BigDecimal(m);
        User user = userService.getUserByUid(token);
        Demand d = new Demand();
        d.setDemandId(demandId);
        if (bargainService.isBargained(user.getId(), demandId)) {
            return JsonUtil.errorResp(-2, "msg", "该用户已经砍过价。");
        }
        Demand demand = demandService.getDeamndByDemandId(demandId);
        BigDecimal nowmoney = demand.getEndMoney().subtract(demand.getAimsMoney());
        if (nowmoney.subtract(money).doubleValue() >= 0) {
            d.setEndMoney(money);
        } else if (nowmoney.doubleValue() > 0) {
            money = nowmoney;
            d.setEndMoney(money);
        } else {
            return JsonUtil.errorResp(-2, "已砍到目标价。");
        }
        bargainService.addBargain(new Bargain(demandId, user.getId(), new Date(), money), d);
        return JsonUtil.successResp("money", money + "");
    }

    @PostMapping("/adddemand")
    String addDemand(Demand demand) {
        if (demand.getDemandId() == null
                || demand.getStartMoney() == null
                || demand.getAimsMoney() == null
                || demand.getNickname() == null || demand.getNickname().trim().equals("")) {
            return JsonUtil.errorResp(-1, "参数错误。");
        }
        demand.setEndMoney(demand.getStartMoney());
        demandService.addDemand(demand);
        return JsonUtil.successResp("msg", "成功");
    }

}