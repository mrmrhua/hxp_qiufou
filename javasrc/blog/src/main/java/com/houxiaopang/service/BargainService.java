package com.houxiaopang.service;

import com.houxiaopang.model.Bargain;
import com.houxiaopang.model.Demand;
import org.springframework.transaction.annotation.Transactional;

/**
 * author robin on 2017/11/8.
 */

public interface BargainService {
    public Bargain getBargainById(Long id);

    public void addBargain(Bargain bargain, Demand demand);


    /**
     *
     * 该用户是否砍过价
     * @param userId
     * @return true or false
     */
    public boolean isBargained(Long userId,Long demandId);
}
