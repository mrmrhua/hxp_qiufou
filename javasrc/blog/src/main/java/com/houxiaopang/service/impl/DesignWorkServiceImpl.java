package com.houxiaopang.service.impl;

import com.houxiaopang.dao.DesignworksMapper;
import com.houxiaopang.model.Albums;
import com.houxiaopang.model.Designworks;
import com.houxiaopang.pojo.Album;
import com.houxiaopang.service.DesignWorksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * author robin on 2017/11/27.
 */
@Service
public class DesignWorkServiceImpl implements DesignWorksService {

    @Autowired
    DesignworksMapper designworksMapper;

    @Override
    public int insertList(List<Album> albums, List<Albums> albums1s) {
        List<Designworks> indesignworks = new ArrayList<>();
        for (int i = 0, size = albums1s.size(); i < size; i++) {
            for (String img : albums.get(i).getImgs()) {
                Designworks designworks = new Designworks();
                designworks.setAlbumId(albums1s.get(i).getId());
                designworks.setCategory(albums1s.get(i).getCategory());
                designworks.setUpTime(albums1s.get(i).getUpTime());
                designworks.setWorkUrl(img);
                indesignworks.add(designworks);
            }
        }
        return designworksMapper.insertList(indesignworks);
    }
}
