package com.houxiaopang.util;

import com.houxiaopang.pojo.Rule;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * author robin on 2017/11/25.
 * 解析xml 文件
 */
public class DomParser {
    /**
     * 将解析的xml文件，添加到map中
     *
     * @return
     * @throws DocumentException
     */
    public static Map<String, Rule> readConfig() throws DocumentException {
        InputStream resourceAsStream = DomParser.class.getClassLoader().getResourceAsStream("config.xml");
        SAXReader saxReader = new SAXReader();
        Document doc = saxReader.read(resourceAsStream);
        Element el = doc.getRootElement();
        List<Element> elements = el.elements();
        Map<String, Rule> map = new HashMap<>();
        for (Element element : elements) {
            Rule rule = new Rule();
            String name = element.elementText("name");
            rule.setName(name);
            rule.setList(element.elementText("list"));
            rule.setUrl(element.elementText("url"));
            rule.setCategory(element.elementText("category"));
            rule.setDescription(element.elementText("description"));
            rule.setImg(element.elementText("img"));
            rule.setNextpage(element.elementText("nextpage"));
            map.put(name, rule);
        }
        return map;
    }
}
