package com.houxiaopang.pojo;

import java.util.Date;

public class Albums {
    private Integer id;

    private Integer userId;

    private String title;

    private Integer category;

    private Date upTime;

    private String cover;

    private Integer privacy;

    private Boolean notAnonymous;

    private Boolean notBusiness;

    private Boolean notSaved;

    private Boolean notSingle;

    private String price;

    private String description;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public Date getUpTime() {
        return upTime;
    }

    public void setUpTime(Date upTime) {
        this.upTime = upTime;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover == null ? null : cover.trim();
    }

    public Integer getPrivacy() {
        return privacy;
    }

    public void setPrivacy(Integer privacy) {
        this.privacy = privacy;
    }

    public Boolean getNotAnonymous() {
        return notAnonymous;
    }

    public void setNotAnonymous(Boolean notAnonymous) {
        this.notAnonymous = notAnonymous;
    }

    public Boolean getNotBusiness() {
        return notBusiness;
    }

    public void setNotBusiness(Boolean notBusiness) {
        this.notBusiness = notBusiness;
    }

    public Boolean getNotSaved() {
        return notSaved;
    }

    public void setNotSaved(Boolean notSaved) {
        this.notSaved = notSaved;
    }

    public Boolean getNotSingle() {
        return notSingle;
    }

    public void setNotSingle(Boolean notSingle) {
        this.notSingle = notSingle;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price == null ? null : price.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    @Override
    public String toString() {
        return "Albums{" +
                "id=" + id +
                ", userId=" + userId +
                ", title='" + title + '\'' +
                ", category=" + category +
                ", upTime=" + upTime +
                ", cover='" + cover + '\'' +
                ", privacy=" + privacy +
                ", notAnonymous=" + notAnonymous +
                ", notBusiness=" + notBusiness +
                ", notSaved=" + notSaved +
                ", notSingle=" + notSingle +
                ", price='" + price + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}