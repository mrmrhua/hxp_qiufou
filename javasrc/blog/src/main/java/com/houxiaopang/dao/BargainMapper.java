package com.houxiaopang.dao;

import com.houxiaopang.model.Bargain;
import org.apache.ibatis.annotations.Param;

public interface BargainMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_bargain
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_bargain
     *
     * @mbggenerated
     */
    int insert(Bargain record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_bargain
     *
     * @mbggenerated
     */
    int insertSelective(Bargain record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_bargain
     *
     * @mbggenerated
     */
    Bargain selectByPrimaryKey(Long id);

    Bargain selectByUserId(@Param("userId") Long userId, @Param("demandId") Long demandId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_bargain
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(Bargain record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_bargain
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(Bargain record);
}