<!DOCTYPE html>
<html lang="zh_CN">
<head>
    <meta charset="UTF-8">
    <title>博客</title>
    <link rel="stylesheet" href="http://www.houxiaopang.com/static/css/blog.css">
</head>
<body>
<div class="box">
    <div class="navbar">
        <div class="logo-wrapper">
            <span class="logo"></span>
        </div>
        <div class="navbar-li-wrapper">
            <ul class="nav-li">
                <li><a href="http://www.houxiaopang.com">首页</a></li>
                <!--<li onclick="javascript:location.href='http://houxiaopang.com/demand';">发单广场</li>-->
                <li><a href="http://www.houxiaopang.com/workdetail">作品精选</a></li>
                <li class="nav-active">设计动态</li>
            </ul>
        </div>
    </div>
    <hr style="height: 1px;width:100%;background-color: #DEDEDE;border: none">
    <div class="box-content">
        <div class="content-header">
            <div class="header-top">
                <div style="background:rgba(254,101,73,1);color: #FFFFFF">
                    案例介绍
                </div>
                <a href="/blog/design">
                    <div style="color: #FE6549">
                        设计点滴
                    </div>
                </a>
            </div>
            <div class="header-center">
                <p>客户案例</p>
            </div>
            <div class="header-footer">
                <p>展示在猴小胖平台成功交易的案例</p>
            </div>
        </div>
        <div class="content-content">
        <#list cases as case>
            <a href="/blog/case/${case.id}" target="_blank">
                <div class="cc-box">
                    <div class="ccbox-pic" style="overflow: hidden">
                        <img style="max-width:100%;max-height: 100%;" src="${case.cover}" alt="">
                    </div>
                    <div class="ccbox-msg">
                        <div class="ccbox-header">
                            <p>${case.title}</p>
                        </div>
                        <div class="ccbox-content">
                            <p>${case.description}</p>
                        </div>
                    </div>
                </div>
            </a>
        </#list>
        </div>
        <section class="pages-wrap">
            <ul class="pagination clearfix">
            <#if (nowpage > 1) >
                <li><a href="/blog/design?page=1">首页</a></li>
                <li><a href="/blog/design?page=${nowpage-1}">上一页</a></li>
            </#if>
            <#if (totalpage>1)>
                <#if totalpage <= 9 >
                    <#list 1..totalpage as i>
                        <#if nowpage == i >
                            <li class="active">
                                <a href="javascript:;">${i}</a>
                            </li>
                        <#else>
                            <li>
                                <a href="/blog/design?page=${i}">${i}</a>
                            </li>
                        </#if>
                    </#list>
                <#else>
                    <#if (nowpage> 5 && nowpage < totalpage-3)>
                        <#list 1..2 as i>
                            <li>
                                <a href="/blog/design?page=${i}">${i}</a>
                            </li>
                        </#list>
                        <li class="disabled">
                            <a href="javascript:;">···</a>
                        </li>
                        <#list nowpage-1..nowpage+1 as i>
                            <#if nowpage == i >
                                <li class="active">
                                    <a href="javascript:;">${i}</a>
                                </li>
                            <#else>
                                <li>
                                    <a href="/blog/design?page=${i}">${i}</a>
                                </li>
                            </#if>
                        </#list>
                        <li class="disabled">
                            <a href="javascript:;">···</a>
                        </li>
                        <#list totalpage-1..totalpage as i>
                            <li>
                                <a href="/blog/design?page=${i}">${i}</a>
                            </li>
                        </#list>
                    <#elseif (nowpage>totalpage-6)>
                        <#list 1..2 as i>
                            <li>
                                <a href="/blog/design?page=${i}">${i}</a>
                            </li>
                        </#list>
                        <li class="disabled">
                            <a href="javascript:;">···</a>
                        </li>
                        <#list totalpage-5..totalpage as i>
                            <#if nowpage == i >
                                <li class="active">
                                    <a href="javascript:;">${i}</a>
                                </li>
                            <#else>
                                <li>
                                    <a href="/blog/design?page=${i}">${i}</a>
                                </li>
                            </#if>
                        </#list>
                    <#else>
                        <#list 1..6 as i>
                            <#if nowpage == i >
                                <li class="active">
                                    <a href="javascript:;">${i}</a>
                                </li>
                            <#else>
                                <li>
                                    <a href="/blog/design?page=${i}">${i}</a>
                                </li>
                            </#if>
                        </#list>
                        <li class="disabled">
                            <a href="javascript:;">···</a>
                        </li>
                        <#list totalpage-1..totalpage as i>
                            <li>
                                <a href="/blog/design?page=${i}">${i}</a>
                            </li>
                        </#list>
                    </#if>
                </#if>
            </#if>
            <#if (nowpage < totalpage) >
                <li><a href="/blog/design?page=${nowpage+1}">下一页</a></li>
                <li><a href="/blog/design?page=${totalpage}">尾页</a></li>
            </#if>
            </ul>
        </section>
    </div>
</div>
</body>
</html>