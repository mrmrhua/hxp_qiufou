package com.houxiaopang.model;

public class DesignersWithBLOBs extends Designers {
    private String projectText;

    private String intro;

    public String getProjectText() {
        return projectText;
    }

    public void setProjectText(String projectText) {
        this.projectText = projectText == null ? null : projectText.trim();
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro == null ? null : intro.trim();
    }
}