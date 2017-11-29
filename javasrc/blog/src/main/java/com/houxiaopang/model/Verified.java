package com.houxiaopang.model;

import java.util.Date;

public class Verified {
    private Long id;

    private Integer userId;

    private String name;

    private String card;

    private String cardImgUp;

    private String cardImgDowm;

    private Integer status;

    private Date upTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getCard() {
        return card;
    }

    public void setCard(String card) {
        this.card = card == null ? null : card.trim();
    }

    public String getCardImgUp() {
        return cardImgUp;
    }

    public void setCardImgUp(String cardImgUp) {
        this.cardImgUp = cardImgUp == null ? null : cardImgUp.trim();
    }

    public String getCardImgDowm() {
        return cardImgDowm;
    }

    public void setCardImgDowm(String cardImgDowm) {
        this.cardImgDowm = cardImgDowm == null ? null : cardImgDowm.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getUpTime() {
        return upTime;
    }

    public void setUpTime(Date upTime) {
        this.upTime = upTime;
    }
}