package com.houxiaopang;

import com.houxiaopang.service.AlbumsService;
import com.houxiaopang.util.CategoryUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {

    @Autowired
    AlbumsService albumsService;

    @Test
    public void setCate(){
        System.out.println(CategoryUtil.formatCateId("网页-电商"));
    }


}
