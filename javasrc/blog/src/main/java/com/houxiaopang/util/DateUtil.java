package com.houxiaopang.util;

import java.net.URL;
import java.net.URLConnection;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 
 * @author 墨迹
 *
 */
public class DateUtil {

	/**
	 * 将String（yyyy'年'MM'月'dd'日' HH:mm:ss）类型格式化成date
	 * @param time
	 * @return
	 */
	public static Date setDate(String time) {
		  SimpleDateFormat formatter = new SimpleDateFormat("yyyy'年'MM'月'dd'日' HH:mm:ss");
		  Date strtodate;
		try {
			strtodate = formatter.parse(time);
			return strtodate;
		} catch (ParseException e) {
			throw new RuntimeException("输入的时间格式错误");
		}
	}
	/**
	 * 将date类型格式化成String（yyyy'年'MM'月'dd'日' HH:mm:ss）
	 * @param date
	 * @return
	 */
	public static String setChinaDate(Date date) {
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy'年'MM'月'dd'日' HH:mm:ss");
		String d=sdf.format(date);
		return d;	
	}
	/**
	 * 将date类型格式化成String（yyyyMMddHHmmss）
	 * @param date
	 * @return
	 */
	public static String setDate(Date date) {
		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddHHmmss");
		String d=sdf.format(date);
		return d;	
	}
	/**
	 * 将date类型格式化成String(yyyy-MM-dd HH:mm:ss)
	 * @param date
	 * @return
	 */
	public static String setMysqlDate(Date date) {
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String d=sdf.format(date);
		return d;	
	}
	
	/**
	 * 得到当前时间hous个小时之前的时间
	 * @param date
	 * @param hous
	 * @return
	 */
	public static Date getAfterDate(Date date,int hous){
		Calendar Cal=Calendar.getInstance();    
		Cal.setTime(date);    
		Cal.add(Calendar.HOUR_OF_DAY,-hous);
		return Cal.getTime();
	}
	
	/**
	 * 获取百度的网络时间(标准北京时间)
	 * @return
	 * @throws Exception
	 */
	public static String getTime() throws Exception{
		String webUrl="http://www.baidu.com";
		URL url=new URL(webUrl);
		URLConnection urlConnection=url.openConnection();
		urlConnection.connect();
		return setDate(new Date(urlConnection.getDate()));
	}
}
