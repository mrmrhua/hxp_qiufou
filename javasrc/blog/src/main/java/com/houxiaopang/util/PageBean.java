package com.houxiaopang.util;

public class PageBean {
	private int page;
	private int rows;
	private int start;
	
	public PageBean(){
		
	}
	public PageBean(int page, int rows) {
		super();
		this.page = page;
		this.rows = rows;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getRows() {
		return rows;
	}
	public void setRows(int rows) {
		this.rows = rows;
	}
	public int getStart() {
		start=(page-1)*rows;
		return start;
	}
	
}
