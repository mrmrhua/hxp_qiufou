package com.houxiaopang.util;

import com.houxiaopang.factory.AlbumFactory;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.InputStream;

/**
 * author robin on 2017/11/26.
 */
public final class MybatisUtil {

    private static SqlSession sqlSession = null;

    private MybatisUtil() {
    }


    public static SqlSession getInstance() {
        if (sqlSession == null) {
            String resource = "mybatis.xml";
            InputStream is = AlbumFactory.class.getClassLoader().getResourceAsStream(resource);
            SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(is);
            sqlSession = sessionFactory.openSession();
            return sqlSession;
        }
        return sqlSession;
    }

}
