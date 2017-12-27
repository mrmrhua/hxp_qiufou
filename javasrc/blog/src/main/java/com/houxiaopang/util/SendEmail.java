
package com.houxiaopang.util;

import com.houxiaopang.service.AsyncTask;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


/**
 * author robin on 2017/11/28.
 */
public class SendEmail {
    private static final Logger logger = LoggerFactory.getLogger(SendEmail.class);

    public static void send(String toEmail, String title, String content) {
        try {
            sendEmailWidhtSSL(toEmail, title, content);
        } catch (Exception e) {
            logger.error("报错邮件发送失败。请检查QQ邮箱授权码是否过期。");
        }
    }


    /**
     * 发送邮件，基于smtp。使用的是新浪邮箱 ssl为false
     *
     * @param toEmail
     * @param content
     * @throws Exception
     */
    public static void sendEmail(String toEmail, String title, String content) throws Exception {
        Properties props = new Properties();
        // 告诉程序要认证的
        props.setProperty("mail.smtp.auth", "true");
        // 告诉程序使用什么协议
        props.setProperty("mail.transport.protocol", "smtp");
        Session session = Session.getInstance(props);
        Message msg = new MimeMessage(session);
        msg.setSubject(title);
        msg.setText(content);
        msg.setFrom(new InternetAddress("wpzan@sina.cn"));
        Transport transport = session.getTransport();
        transport.connect("smtp.sina.cn", 25, "wpzan@sina.cn", "wuzan926159");
        transport.sendMessage(msg, new Address[]{new InternetAddress(toEmail)});
        transport.close();
    }

    /**
     * 发送邮件，基于smtp。使用的是QQ邮箱 ssl为true
     *
     * @param toEmail
     * @param content
     * @throws Exception
     */
    public static void sendEmailWidhtSSL(String toEmail, String title, String content) throws Exception {
        toEmail = toEmail == null ? "dyh@houxiaopang.com" : toEmail;
        Properties props = new Properties();
        props.setProperty("mail.smtp.auth", "true");
        final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";
        props.setProperty("mail.smtp.socketFactory.class", SSL_FACTORY);
        props.setProperty("mail.smtp.socketFactory.fallback", "false");
        props.setProperty("mail.smtp.socketFactory.port", "465");
        props.setProperty("mail.transport.protocol", "smtp");
        Session session = Session.getInstance(props);
        Message msg = new MimeMessage(session);
        msg.setSubject(title);
        msg.setText(content);
        msg.setFrom(new InternetAddress("284595745@qq.com"));
        Transport transport = session.getTransport();
        transport.connect("smtp.qq.com", 456, "284595745@qq.com", "bxcvhmwruhrlcacc");
        transport.sendMessage(msg, new Address[]{new InternetAddress(toEmail)});
        transport.close();
    }

}