package com.houxiaopang.controllor;

import com.houxiaopang.util.DateUtil;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * author robin on 2017/11/27.
 */
@ServerEndpoint("/websocket")
@Component
public class WSControllor {


    private static int onlineCount = 0;
    private static List<WSControllor> webSocketSet = new ArrayList<>();

    private Session session;

    @OnOpen
    public void onOpen(Session session) throws IOException {
        this.session = session;
        webSocketSet.add(this);
        incrOnlineCount();
        for (WSControllor item : webSocketSet) {
            if (!item.equals(this)) { //send to others only.
                item.sendMessage("someone just joined in.");
            } else {
                item.sendMessage("welcome.");
            }
        }
    }

    @OnClose
    public void onClose() throws IOException {
        webSocketSet.remove(this);
        decOnlineCount();
        for (WSControllor item : webSocketSet) {
            item.sendMessage("someone just closed a connection.");
        }
    }

    @OnMessage
    public void onMessage(String message) throws IOException {
        // broadcast received message
        for (WSControllor item : webSocketSet) {
            item.sendMessage(message + DateUtil.setMysqlDate(new Date()));
        }
    }

    public void sendMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
    }

    public static synchronized int getOnlineCount() {
        return WSControllor.onlineCount;
    }

    public static synchronized void incrOnlineCount() {
        WSControllor.onlineCount++;
    }

    public static synchronized void decOnlineCount() {
        WSControllor.onlineCount--;
    }
}


