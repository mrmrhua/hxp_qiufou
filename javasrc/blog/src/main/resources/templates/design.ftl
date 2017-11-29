<!DOCTYPE html>
<html lang="zh_CH">
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
                <a href="/blog/case">
                    <div style="color: #FE6549">
                        案例介绍
                    </div>
                </a>
                <div style="background:rgba(254,101,73,1);color: #FFFFFF">
                    设计点滴
                </div>
            </div>
            <div class="header-center">
                <p>设计点滴</p>
            </div>
            <div class="header-footer">
                <p>分享设计相关的技巧和感悟</p>
            </div>
        </div>
        <div class="content-content">
        <#list designs as design>
            <a href="/blog/design/${design.id}" target="_blank">
                <div class="cc-box2">
                    <div class="ccbox-pic2" style="overflow: hidden">
                        <img src="${design.cover}" style="max-width:100%;max-height: 100%;" alt="">
                    </div>
                    <div class="ccbox-msg2">
                        <div class="ccbox-header2">
                            <p>${design.title}</p>
                        </div>
                        <div class="ccbox-user2">
                        <#--<p style="float: left">设计师：yoki</p>
                            <p style="float: right">2017-10-20</p>-->
                        </div>
                        <div class="ccbox-content2">
                            <p>${design.description}</p>
                        </div>
                        <div class="ccbox-footer2">
                            <p style="float: right;line-height: 20px;margin-left: 31px;"><i class="iconfont" style="color: #2570FF;font-size:19px;">&#xe626;</i>
                            </p>
                            <p style="float: right;color: #2570FF;font-size: 12px;line-height: 20px">查看详情</p>
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

